import { Blog } from "../models/blog.model.js";
import { getAnglesForTopic } from "./blog.angles.js";

/**
 * Get one available angle for a category + topic.
 *
 * Same topic allowed.
 * Same intentGroup is NOT allowed.
 *
 * Example:
 * ChatGPT + core-overview      -> used
 * ChatGPT + productivity       -> still available
 * ChatGPT + education          -> still available
 */
export const getAvailableAngle = async ({ category, topic }) => {
  if (!category || !topic) {
    return null;
  }

  // Get all possible angles for this topic
  const angles = getAnglesForTopic(topic);

  if (!Array.isArray(angles) || angles.length === 0) {
    return null;
  }

  // Find existing active blogs for this category + topic
  const existingBlogs = await Blog.find(
    {
      category: category.trim(),
      topic: topic.trim(),
      status: {
        $in: ["draft", "published"],
      },
    },
    {
      intentGroup: 1,
      angle: 1,
    }
  ).lean();

  // Store already-used intent groups
  const usedIntentGroups = new Set(
    existingBlogs
      .map((blog) => blog.intentGroup)
      .filter(Boolean)
  );

  // Only keep angles whose intentGroup has not been used
  const availableAngles = angles.filter(
    (angle) =>
      angle?.intentGroup &&
      !usedIntentGroups.has(angle.intentGroup)
  );

  // Every intent has already been used
  if (availableAngles.length === 0) {
    return null;
  }

  // Pick a random available angle
  const randomIndex = Math.floor(
    Math.random() * availableAngles.length
  );

  return availableAngles[randomIndex];
};


/**
 * Check whether a generated blog already exists
 * by exact title or exact slug.
 *
 * This check happens AFTER Gemini generation.
 */
export const checkExactDuplicate = async ({
  title,
  slug,
}) => {
  const conditions = [];

  // Exact title check
  if (title && typeof title === "string") {
    conditions.push({
      title: title.trim(),
    });
  }

  // Exact slug check
  if (slug && typeof slug === "string") {
    conditions.push({
      slug: slug.trim().toLowerCase(),
    });
  }

  // Nothing to check
  if (conditions.length === 0) {
    return null;
  }

  const existingBlog = await Blog.findOne({
    $or: conditions,
  }).lean();

  return existingBlog || null;
};


/**
 * Check whether a specific intentGroup
 * has already been used for a topic.
 *
 * Useful when you already know the intended angle.
 */
export const isIntentGroupUsed = async ({
  category,
  topic,
  intentGroup,
}) => {
  if (!category || !topic || !intentGroup) {
    return false;
  }

  const existingBlog = await Blog.exists({
    category: category.trim(),
    topic: topic.trim(),
    intentGroup: intentGroup.trim(),
    status: {
      $in: ["draft", "published"],
    },
  });

  return Boolean(existingBlog);
};


/**
 * Get all intent groups that have already been used
 * for a specific category + topic.
 */
export const getUsedIntentGroups = async ({
  category,
  topic,
}) => {
  if (!category || !topic) {
    return [];
  }

  const existingBlogs = await Blog.find(
    {
      category: category.trim(),
      topic: topic.trim(),
      status: {
        $in: ["draft", "published"],
      },
    },
    {
      intentGroup: 1,
    }
  ).lean();

  return [
    ...new Set(
      existingBlogs
        .map((blog) => blog.intentGroup)
        .filter(Boolean)
    ),
  ];
};


/**
 * Get all available angles for a topic.
 *
 * This is useful if later you want to show
 * all remaining angles before generating.
 */
export const getAvailableAngles = async ({
  category,
  topic,
}) => {
  if (!category || !topic) {
    return [];
  }

  const angles = getAnglesForTopic(topic);

  if (!Array.isArray(angles) || angles.length === 0) {
    return [];
  }

  const usedIntentGroups = new Set(
    await getUsedIntentGroups({
      category,
      topic,
    })
  );

  return angles.filter(
    (angle) =>
      angle?.intentGroup &&
      !usedIntentGroups.has(angle.intentGroup)
  );
};


/**
 * Check whether a topic still has any unused angle.
 */
export const hasAvailableAngle = async ({
  category,
  topic,
}) => {
  const availableAngles = await getAvailableAngles({
    category,
    topic,
  });

  return availableAngles.length > 0;
};


/**
 * Get the total number of already-used intents
 * for a category + topic.
 */
export const getUsedIntentCount = async ({
  category,
  topic,
}) => {
  const usedIntentGroups = await getUsedIntentGroups({
    category,
    topic,
  });

  return usedIntentGroups.length;
};


/**
 * Get complete duplicate information for a topic.
 *
 * Example response:
 *
 * {
 *   topic: "ChatGPT",
 *   totalAngles: 5,
 *   usedAngles: 2,
 *   availableAngles: 3,
 *   usedIntentGroups: [...]
 * }
 */
export const getTopicDuplicateInfo = async ({
  category,
  topic,
}) => {
  if (!category || !topic) {
    return null;
  }

  const angles = getAnglesForTopic(topic);

  const usedIntentGroups = await getUsedIntentGroups({
    category,
    topic,
  });

  const usedSet = new Set(usedIntentGroups);

  const availableAngles = Array.isArray(angles)
    ? angles.filter(
      (angle) =>
        angle?.intentGroup &&
        !usedSet.has(angle.intentGroup)
    )
    : [];

  return {
    category: category.trim(),
    topic: topic.trim(),

    totalAngles: Array.isArray(angles)
      ? angles.length
      : 0,

    usedAngles: usedIntentGroups.length,

    availableAngles: availableAngles.length,

    usedIntentGroups,

    availableIntentGroups: availableAngles.map(
      (angle) => angle.intentGroup
    ),

    availableAnglesList: availableAngles,
  };
};