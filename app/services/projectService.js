const { users,metricGroup, userProjects, metrics, platform, sections, frequencies, categories, brands, userUrls, userAnalytic, projectBenchmark, userProjectDQScore, superThemeMetricGroup, newMetrics } = require('../models');
const { Op, Sequelize } = require('sequelize');
const moment = require("moment"); 
const { getMonthNumberFromString } = require('../utils/dateHandler');
getMonthNumberFromString


async function createProject(userData) {
  const { project_name, user_id, metric_id, brand_id, category_id, frequency_id, start_date, end_date } = userData;

  try {
    // Find the user
    const existingProject = await userProjects.findOne({
      where: { project_name },
    });
    if (existingProject) {
      throw new Error('Project name already exists. Please choose a different name.');
    }

    const user = await users.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error('User not found');
    }

    // Create the project
    const project = await userProjects.create({
      project_name,
      user_id,
      metric_id,
      brand_id,
      category_id,
      frequency_id,
      start_date,
      end_date
    });
    if (!project) {
      throw new Error('Project not created');
    }

    // Find metrics
    const metricData = await metrics.findAll({
      where: {
        id: {
          [Op.in]: metric_id
        }
      }
    });

    // Retrieve all platforms and sections
    const platforms = await platform.findAll();
    const section = await sections.findAll();

    // Convert platforms and sections to objects for easy lookup
    const platformMap = platforms.reduce((acc, p) => {
      acc[p.id] = p.toJSON();
      return acc;
    }, {});
    const sectionMap = section.reduce((acc, s) => {
      acc[s.id] = s.toJSON();
      return acc;
    }, {});

    // Format metrics
    const formattedMetrics = metricData.map(metric => {
      const platformData = platformMap[metric.platform_id] || null;
      const sectionData = sectionMap[metric.section_id] || null;

      return {
        ...metric.toJSON(),
        platform: platformData,
        section: sectionData
      };
    });

    // Calculate weight for each entry
    const numberOfEntries = formattedMetrics.length;
    const weight = numberOfEntries > 0 ? 100 / numberOfEntries : 0;

    // Store formatted data in UserAnalytics with calculated weights
    const userAnalyticsEntries = formattedMetrics.map(metric => ({
      project_id: project.id,
      metric_id: metric.id,
      platform_id: metric.platform ? metric.platform.id : null,
      section_id: metric.section ? metric.section.id : null,
      weights: weight // Assign the calculated weight
    }));

    await userAnalytic.bulkCreate(userAnalyticsEntries);

    return project;
  } catch (error) {
    throw new Error(`Error in createProject: ${error.message}`);
  }
}
async function createProject(userData) {
  const { project_name, user_id, metric_id, brand_id, category_id, frequency_id, start_date, end_date } = userData;

  try {
    // Find the user
    const existingProject = await userProjects.findOne({
      where: { project_name },
    });
    if (existingProject) {
      throw new Error('Project name already exists. Please choose a different name.');
    }

    const user = await users.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error('User not found');
    }

    // Create the project
    const project = await userProjects.create({
      project_name,
      user_id,
      metric_id,
      brand_id,
      category_id,
      frequency_id,
      start_date,
      end_date
    });
    if (!project) {
      throw new Error('Project not created');
    }

    // Find metrics
    const metricData = await metrics.findAll({
      where: {
        id: {
          [Op.in]: metric_id
        }
      }
    });

    // Retrieve all platforms and sections
    const platforms = await platform.findAll();
    const section = await sections.findAll();

    // Convert platforms and sections to objects for easy lookup
    const platformMap = platforms.reduce((acc, p) => {
      acc[p.id] = p.toJSON();
      return acc;
    }, {});
    const sectionMap = section.reduce((acc, s) => {
      acc[s.id] = s.toJSON();
      return acc;
    }, {});

    // Format metrics
    const formattedMetrics = metricData.map(metric => {
      const platformData = platformMap[metric.platform_id] || null;
      const sectionData = sectionMap[metric.section_id] || null;

      return {
        ...metric.toJSON(),
        platform: platformData,
        section: sectionData
      };
    });


    // Calculate weight for each entry
    const numberOfEntries = formattedMetrics.length;
    const weight = numberOfEntries > 0 ? 100 / numberOfEntries : 0;

    // Store formatted data in UserAnalytics with calculated weights
    const userAnalyticsEntries = formattedMetrics.map(metric => ({
      project_id: project.id,
      metric_id: metric.id,
      platform_id: metric.platform ? metric.platform.id : null,
      section_id: metric.section ? metric.section.id : null,
      weights: weight // Assign the calculated weight
    }));

    await userAnalytic.bulkCreate(userAnalyticsEntries);

    return project;
  } catch (error) {
    throw new Error(`Error in createProject: ${error.message}`);
  }
}

async function updateProject(projectId, projectData) {
  try {
    // Find the project by its ID
    const project = await userProjects.findByPk(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    // If the project name is provided, update it
    if (projectData.project_name) {
      project.project_name = projectData.project_name;
    }

    // If metric_ids are provided, append them to existing ones
    if (projectData.metric_id && Array.isArray(projectData.metric_id)) {
      const existingMetrics = project.metric_id || [];
      const updatedMetrics = [...new Set([...existingMetrics, ...projectData.metric_id])];  // Append new metrics without duplicates
      project.metric_id = updatedMetrics;
    }

    // If other fields are provided in the project data, update them
    if (projectData.is_benchmark_saved !== undefined) {
      project.is_benchmark_saved = projectData.is_benchmark_saved;
    }

    if (projectData.file_url) {
      project.file_url = projectData.file_url;
    }

    if (projectData.brand_id) {
      project.brand_id = projectData.brand_id;
    }

    if (projectData.category_id) {
      project.category_id = projectData.category_id;
    }

    if (projectData.frequency_id) {
      project.frequency_id = projectData.frequency_id;
    }

    if (projectData.start_date) {
      project.start_date = projectData.start_date;
    }

    if (projectData.end_date) {
      project.end_date = projectData.end_date;
    }

    // Update the project with the new data
    await project.save();  // Save the changes to the project

    // Return the updated project details
    return project;
  } catch (error) {
    throw new Error(`Error updating project: ${error.message}`);
  }
}

const toggleFavorite = async (id, is_favorite) => {
  try {
    const project = await userProjects.findOne({ where: { id } });

    if (!project) {
      return null;
    }

    project.is_favorite = is_favorite;
    await project.save(); 

    return project; 
  } catch (error) {
    console.error(error);
    throw new Error('Error updating favorite status');
  }
};


async function deleteProject(projectId) {
  try {
    // Find the project by its ID
    const project = await userProjects.findByPk(projectId);  // Assuming Project is the correct model name

    if (!project) {
      throw new Error("Project not found");
    }

    // Delete the project
    await project.destroy();

    // Return the deleted project details (or confirmation message)
    return { message: 'Project deleted successfully', projectId };
  } catch (error) {
    throw new Error(`Error deleting project: ${error.message}`);
  }
}

const removeMetricFromProject = async (projectId, metricId) => {
  try {
    
    // Find the project by ID
    const project = await userProjects.findOne({ where: { id: projectId } });
    if (!project) {
      throw new Error('Project not found');
    }



    // Check if the metric exists in the metric_id array
    const metricArray = project.metric_id;
    const metricIdInt = parseInt(metricId, 10); // Ensure metricId is an integer


    if (!metricArray.includes(metricIdInt)) {
      throw new Error('Metric not found in this project');
    }

    // Remove the metric from the array
    const updatedMetricArray = metricArray.filter(id => id !== metricIdInt);

    // Update the project with the new metric_id array
    await project.update({ metric_id: updatedMetricArray });

    return { message: 'Metric removed successfully from the project' };
  } catch (error) {
    throw new Error(`Error in removeMetricFromProject: ${error.message}`);
  }
};


const checkProjectNameAvailability = async (project_name) => {
  try {
    const existingProject = await userProjects.findOne({
      where: { project_name },
    });

    if (existingProject) {
      return { available: false, message: 'Project name already exists.' };
    }
    return { available: true };
  } catch (error) {
    throw new Error(`Error checking project name availability: ${error.message}`);
  }
};

const getProjectById = async (projectId) => {
  try {
    const project = await userProjects.findOne({
      where: { id: projectId },
      attributes: ['id', 'project_name', 'user_id', 'metric_id', 'is_benchmark_saved', 'brand_id', 'category_id', 'frequency_id', 'start_date', 'end_date', 'createdAt', 'updatedAt']
    });

    if (!project) {
      throw new Error('Project not found');
    }
    const userAnalyticsData = await userAnalytic.findAll({
      where: {
        project_id: projectId,
        metric_id: {
          [Op.in]: project.metric_id
        }
      },
      attributes: [
        'metric_id', 'platform_id', 'section_id', 'weights'
      ]
    });

    const metricIds = [...new Set(userAnalyticsData.map(ua => ua.metric_id).filter(id => id != null))];
    const platformIds = [...new Set(userAnalyticsData.map(ua => ua.platform_id).filter(id => id != null))];
    const sectionIds = [...new Set(userAnalyticsData.map(ua => ua.section_id).filter(id => id != null))];

    const metricsData = await newMetrics.findAll({
      where: {
        id: {
          [Op.in]: metricIds
        }
      }
    });

    // Fetch platforms
    const platforms = await platform.findAll({
      where: {
        id: {
          [Op.in]: platformIds
        }
      }
    });

    const sectionData = await sections.findAll({
      where: {
        id: {
          [Op.in]: sectionIds
        }
      }
    });

    const frequencyData = await frequencies.findAll({
      where: {
        id: {
          [Op.in]: project.frequency_id
        }
      }
    });

    const categoryData = await categories.findAll({
      where: {
        id: {
          [Op.in]: project.category_id
        }
      }
    });

    const brandData = await brands.findAll({
      where: {
        id: {
          [Op.in]: project.brand_id
        }
      }
    });

    const platformMap = platforms.reduce((acc, p) => {
      acc[p.id] = p.toJSON();
      return acc;
    }, {});
    const sectionMap = sectionData.reduce((acc, s) => {
      acc[s.id] = s.toJSON();
      return acc;
    }, {});


    const metricMap = metricsData.reduce((acc, m) => {
      acc[m.id] = m.toJSON();
      return acc;
    }, {});

    const formattedMetrics = userAnalyticsData?.map(ua => {
      const metric = metricMap[ua.metric_id] || {};
      const platform = platformMap[ua.platform_id] || null;
      const section = sectionMap[ua.section_id] || null;

      return {
        metric_id: ua.metric_id,
        metric_name: metric.name || null,
        metric_new_name: metric.new_name || null,
        platform: platform,
        section: section,
        weights: ua.weights,
        categories: categoryData.map(c => ({ id: c.id, name: c.name })),
        brands: brandData.map(b => ({ id: b.id, name: b.name })),
      };
    });

    // Omit specific ID fields from the project data
    const { metric_id, brand_id, category_id, frequency_id, ...projectData } = project.toJSON();

    // Include the metrics and other details in the project data
    return {
      ...projectData,
      metrics: formattedMetrics,
      frequencies: frequencyData.map(f => f.name),
      categories: categoryData.map(c => c.name),
      brands: brandData.map(b => b.name),
      isBenchmarkDataSaved: project?.is_benchmark_saved
    };
  } catch (error) {
    throw error;
  }
};

const getProjectByUserId = async (user_id) => {
  try {
    const user = await users.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error('User not Found');
    }

    let projectData = await userProjects.findAll({
      where: { user_id: user_id },
      order: [['createdAt', 'DESC']]
    });

    // Extract unique IDs from array fields
    const frequencyIds = [...new Set(projectData.flatMap(project => project.frequency_id || []))];
    const categoryIds = [...new Set(projectData.flatMap(project => project.category_id || []))];
    const metricIds = [...new Set(projectData.flatMap(project => project.metric_id || []))];
    const brandIds = [...new Set(projectData.flatMap(project => project.brand_id || []))];

    // Fetch related data in parallel
    const [frequenciesData, categoriesData, metricsData, brandsData] = await Promise.all([
      frequencies.findAll({ where: { id: frequencyIds }, attributes: ['id', 'name'] }),
      categories.findAll({ where: { id: categoryIds }, attributes: ['id', 'name'] }),
      metrics.findAll({ where: { id: metricIds }, attributes: ['id', 'name'] }),
      brands.findAll({ where: { id: brandIds }, attributes: ['id', 'name'] }),
    ]);

    // Create lookup maps for quick access
    const frequencyMap = Object.fromEntries(frequenciesData.map(f => [f.id, f.name]));
    const categoryMap = Object.fromEntries(categoriesData.map(c => [c.id, c.name]));
    const metricMap = Object.fromEntries(metricsData.map(m => [m.id, m.name]));
    const brandMap = Object.fromEntries(brandsData.map(b => [b.id, b.name]));

    // Enrich each project with names from lookup maps and exclude unwanted fields
    const enrichedProjects = projectData.map(project => {
      const plainProject = project.get({ plain: true }); // Get plain object

      return {
        id: plainProject.id,
        project_name: plainProject.project_name,
        is_benchmark_saved: plainProject.is_benchmark_saved,
        is_favorite: plainProject.is_favorite,
        file_url: plainProject.file_url,
        start_date: plainProject.start_date,
        end_date: plainProject.end_date,
        user_id: plainProject.user_id,
        createdAt: plainProject.createdAt,
        updatedAt: plainProject.updatedAt,
        frequencyNames: (plainProject.frequency_id || []).map(id => frequencyMap[id]).filter(Boolean),
        categoryNames: (plainProject.category_id || []).map(id => categoryMap[id]).filter(Boolean),
        metricNames: (plainProject.metric_id || []).map(id => metricMap[id]).filter(Boolean),
        brandNames: (plainProject.brand_id || []).map(id => brandMap[id]).filter(Boolean),
      };
    });

    return enrichedProjects;

  } catch (error) {
    throw new Error(error.message);
  }
};

const getProjectByDateRangeAndUserId = async (user_id, filter, year) => {
  try {
    const user = await users.findOne({ where: { id: user_id } });

    if (!user) {
      throw new Error("User not Found");
    }

    if (!year || isNaN(year)) {
      throw new Error("Invalid year provided.");
    }

    let startDate, endDate;

    if (filter && filter.value) {
      if (filter.type === "Monthly") {
        const monthNumber = getMonthNumberFromString(filter.value);

        if (monthNumber === -1) {
          throw new Error("Invalid month string");
        }

        startDate = moment().year(year).month(monthNumber).startOf("month").format('YYYY-MM-DD');
        endDate = moment().year(year).month(monthNumber).endOf("month").format('YYYY-MM-DD');
      } else if (filter.type === "Quarterly") {
        const quarterMapping = {
          "JFM": [0, 2],
          "AMJ": [3, 5],
          "JAS": [6, 8],
          "OND": [9, 11],
        };
        
        if (!quarterMapping[filter.value]) {
          throw new Error("Invalid quarter string");
        }

        const [startMonth, endMonth] = quarterMapping[filter.value];
        startDate = moment().year(year).month(startMonth).startOf("month").format('YYYY-MM-DD');
        endDate = moment().year(year).month(endMonth).endOf("month").format('YYYY-MM-DD');
      }
    } else {
      throw new Error("Invalid filter or missing filter value.");
    }

    let projectData = await userProjects.findAll({
      where: {
        user_id: user_id,
        [Op.and]: [
          {
            [Op.or]: [
              {
                start_date: { [Op.between]: [startDate, endDate] },
              },
              {
                end_date: { [Op.between]: [startDate, endDate] },
              },
            ],
          },
          {
            [Op.or]: [
              {
                start_date: { [Op.gte]: `${year}-01-01`, [Op.lte]: `${year}-12-31` },
              },
              {
                end_date: { [Op.gte]: `${year}-01-01`, [Op.lte]: `${year}-12-31` },
              },
            ],
          }
        ],
      },
      order: [["createdAt", "DESC"]],
    });

    return projectData;
  } catch (error) {
    console.log(error, "service error");
    throw new Error(error.message);
  }
};


// const getProjectByDateRangeAndUserId = async (user_id, filter, year) => {
//   try {
//     const user = await users.findOne({ where: { id: user_id } });

//     if (!user) {
//       throw new Error("User not Found");
//     }

//     let startDate, endDate;

//     if (filter && filter.value) {
//       if (filter.type === "Monthly") {
//         const monthNumber = getMonthNumberFromString(filter.value);

//         if (monthNumber === -1) {
//           throw new Error("Invalid month string");
//         }

//         startDate = moment().month(monthNumber).startOf("month").format('YYYY-MM-DD');
//         endDate = moment().month(monthNumber).endOf("month").format('YYYY-MM-DD');
//       } else if (filter.type === "Quarterly") {
//         const quarterMapping = {
//           "JFM": [0, 2],
//           "AMJ": [3, 5],
//           "JAS": [6, 8],
//           "OND": [9, 11],
//         };
//         const [startMonth, endMonth] = quarterMapping[filter.value];
//         startDate = moment().month(startMonth).startOf("month").format('YYYY-MM-DD');
//         endDate = moment().month(endMonth).endOf("month").format('YYYY-MM-DD');
//       }
//     } else {
//       throw new Error("Invalid filter or missing filter value.");
//     }

//     let projectData = await userProjects.findAll({
//       where: {
//         user_id: user_id,
//         [Op.or]: [
//           {
//             start_date: { [Op.between]: [startDate, endDate] },
//           },
//           {
//             end_date: { [Op.between]: [startDate, endDate] },
//           },
//         ],
//       },
//       order: [["createdAt", "DESC"]],
//     });

//     return projectData;
//   } catch (error) {
//     console.log(error, "service error");
//     throw new Error(error.message);
//   }
// };



const createOrUpdateUrls = async (userId, tabName, urls) => {
  try {
    const [userUrl] = await userUrls.findOrCreate({
      where: { user_id: userId },
      defaults: { tab_name: tabName, urls: [] },
    });

    // Update the URLs
    userUrl.tab_name = tabName;
    userUrl.urls = [...new Set([...userUrl.urls, ...urls])]; // Prevent duplicate URLs
    await userUrl.save();

    return {
      message: 'URLs created successfully',
      urls: userUrl.urls,
    };
  } catch (error) {
    throw new Error('Error creating or updating URLs');
  }
};

const getUrlsByUserId = async (userId) => {
  try {
    const userUrl = await userUrls.findOne({
      where: { user_id: userId }
    });

    if (!userUrl) {
      throw new Error('User URL entry not found');
    }

    return {
      tabName: userUrl.tab_name,
      urls: userUrl.urls,
    };
  } catch (error) {
    throw new Error('Error fetching URLs');
  }
};

const saveMetrics = async (data) => {

  try {
    const newMetrics = await projectBenchmark.bulkCreate(data);
    if (newMetrics) {
      const projectId = data[0].project_id;
      if (projectId) {
        const projectData = await userProjects.findOne({ where: { id: projectId } });

        if (projectData) {
          projectData.is_benchmark_saved = true;

          // Save the updated project data
          await projectData.save();
        }
      }
    }
    return newMetrics;
  } catch (error) {
    throw new Error(error);
  }
}

const getProjectByIds = async (user_id,frequency_id, category_ids) => {
  try {
    const query = {
      user_id: user_id 
    };
    
    if (frequency_id) {
      query.frequency_id = { [Op.contains]: [frequency_id] };
    }

    if (category_ids && Array.isArray(category_ids)) {
      query.category_id = { [Op.contains]: category_ids };
    }

    const projects = await userProjects.findAll({
      where: query,
    });

    return projects;
  } catch (error) {
    throw new Error("Error fetching projects");
  }
};

const getDateRangeByUserId = async(user_id, frequency_id) => {
  const query = {
    user_id: user_id
  }
  if (frequency_id) {
    query.frequency_id = { [Op.contains]: [frequency_id] };
  }
  
  const projectsData = await userProjects.findAll(
   { where:query}
  )
}

const createUserProjectDQScore = async (dqScoreArray) => {
  const scoreDataArray = dqScoreArray.map(score => ({
      user_id: score.user_id,
      project_id: score.project_id,
      brand_id: score.brand_id,
      brand_name: score.brand_name,
      section_name: score.section_name,
      section_id: score.section_id,
      category_id: score.category_id,
      category_name: score.category_name,
      dq: score.dq,
      ecom_dq: score.ecom_dq,
      social_dq: score.social_dq,
      paid_dq: score.paid_dq,
      brand_perf_dq: score.brand_perf_dq,
      createdAt: new Date(),
      updatedAt: new Date()
  }));

  // Perform bulk insert operation using Sequelize
  try {
      const newScores = await userProjectDQScore.bulkCreate(scoreDataArray, { returning: true });
      return newScores;
  } catch (error) {
      // Throw the error to be handled by the controller
      throw new Error(`Failed to create DQ scores: ${error.message}`);
  }
};

const saveGroupMetric = async({ name, project_id, metric_ids }) => {
  try {
    const existingMetricGroup = await metricGroup.findOne({
      where: {
        project_id,
        metric_ids
      }
    });

    if (existingMetricGroup) {
      throw new Error('Metric group with the same project and metric IDs already exists');
    }


    const newMetricGroup = await metricGroup.create({
      name,
      project_id,
      metric_ids
    });

    return newMetricGroup;
  } catch (error) {
    console.log(error);
    
    throw new Error('Error saving Metric Group');
  }
}

const deleteGroupMetricTheme = async (superThemeMetricGroupId, project_id) => {
  console.log('----------------------superThemeMetricGroupId',superThemeMetricGroupId, project_id )
  try {
    // Find the SuperThemeMetricGroup by ID and project_id
    const superThemeMetricGroupRecord = await superThemeMetricGroup.findOne({
      where: {
        id: superThemeMetricGroupId,
        project_id
      }
    });

    // If no record found, throw an error
    if (!superThemeMetricGroupRecord) {
      throw new Error('SuperThemeMetricGroup record not found');
    }

    // Extract associated metric_ids from the record
    const { metric_ids, metric_group_ids } = superThemeMetricGroupRecord;

    // Delete associated MetricGroups based on the metric_ids
    await metricGroup.destroy({
      where: {
        project_id,
        id: metric_group_ids // Assuming metric_group_ids field holds the IDs of related metric groups
      }
    });

    // Now delete the SuperThemeMetricGroup record itself
    await superThemeMetricGroupRecord.destroy();

    // Return success message
    return { message: 'Successfully deleted SuperThemeMetricGroup and associated MetricGroups' };
  } catch (error) {
    // Return error message if something fails
    throw new Error('Error deleting Metric Group and associated records: ' + error.message);
  }
};


const getGroupMetrics = async (projectId) => {
  try {
    const metricGroups = await metricGroup.findAll({
      where: { project_id: projectId },
    });

    return metricGroups;
  } catch (error) {
    throw new Error('Error fetching Metric Groups');
  }
};

const saveGroupMetricTheme = async ({ name, project_id, metric_ids, metric_group_ids }) => {
  try {
    const existingMetricGroup = await superThemeMetricGroup.findOne({
      where: {
        project_id,
        metric_ids,          
        metric_group_ids    
      }
    });

    if (existingMetricGroup) {
      throw new Error('A metric group with the same project, metric IDs, and metric group IDs already exists');
    }
    const newMetricGroup = await superThemeMetricGroup.create({
      name,
      project_id,
      metric_ids,
      metric_group_ids
    });

    return newMetricGroup;
  } catch (error) {
    throw new Error('Error saving Metric Group: ' + error.message);
  }
};


const getMetricGroupsByProjectId = async (project_id) => {
  try {
    const metricGroups = await superThemeMetricGroup.findAll({
      where: { project_id }
    });

    const enrichedMetricGroups = await Promise.all(
      metricGroups.map(async (group) => {
        const metricDetails = await metrics.findAll({
          where: {
            id: group.metric_ids
          },
          attributes: ['id', 'name']
        });

        const metricGroupDetails = await metricGroup.findAll({
          where: {
            id: group.metric_group_ids
          },
          attributes: ['id', 'name'] 
        });

        // Return the enriched group with arrays of objects for metric_ids and metric_group_ids
        return {
          ...group.toJSON(), // Convert Sequelize instance to plain object
          metric_ids: metricDetails.map(metric => ({
            id: metric.id,
            name: metric.name
          })),
          metric_group_ids: metricGroupDetails.map(mg => ({
            id: mg.id,
            name: mg.name
          }))
        };
      })
    );

    return enrichedMetricGroups;
  } catch (error) {
    console.log(error, "Error fetching metric groups");
    throw new Error('Error fetching Metric Groups: ' + error.message);
  }
};


const getProjectBenchmarks = async (projectId) => {
  try {
    // Fetch project benchmarks for the specified projectId
    const benchmarks = await projectBenchmark.findAll({
      where: { project_id: projectId },
    });

    if (!benchmarks || benchmarks.length === 0) {
      return null;
    }

    // Extract section and platform IDs from the benchmarks
    const sectionIds = [...new Set(benchmarks.map(b => b.sectionId))];
    const platformIds = [...new Set(benchmarks.map(b => b.platformId))];
    const metricIds = [...new Set(benchmarks.map(b => b.metricId))];

    // Fetch sections based on the extracted IDs
    const sectionData = await sections.findAll({
      where: { id: sectionIds },
      attributes: ['id', 'name'],
    });

    // Fetch platforms based on the extracted IDs
    const platforms = await platform.findAll({
      where: { id: platformIds },
      attributes: ['id', 'name'],
    });

    const metricsData = await metrics.findAll({
      where: { id: metricIds },
      attributes: ['id', 'name'],
    });

    // Create a map for quick lookup
    const sectionMap = Object.fromEntries(sectionData.map(s => [s.id, s.name]));
    const platformMap = Object.fromEntries(platforms.map(p => [p.id, p.name]));
    const metricsMap = Object.fromEntries(metricsData.map(p => [p.id, p.name]));

    // Format the benchmarks with corresponding section and platform names
    const formattedBenchmarks = benchmarks.map(benchmark => ({
      projectId: benchmark.project_id,
      sectionId: benchmark.sectionId,
      sectionName: sectionMap[benchmark.sectionId] || null,
      platformId: benchmark.platformId,
      platformName: platformMap[benchmark.platformId] || null,
      isOverall: benchmark.isOverall,
      isCategory: benchmark.isCategory,
      metricId: benchmark.metricId,
      metricName: metricsMap[benchmark.metricId] || null,
      weights: benchmark.weights,
      categoryIds: benchmark.categoryIds,
      brandIds: benchmark.brandIds,
      benchmarks: benchmark.benchmarks,
      createdAt: benchmark.created_at,
      updatedAt: benchmark.updated_at,
    }));

    return formattedBenchmarks;
  } catch (error) {
    console.error('Error in ProjectBenchmarksService:', error);
    throw error;
  }
};



module.exports = {
  createProject,
  checkProjectNameAvailability,
  getProjectById,
  getProjectByUserId,
  createOrUpdateUrls,
  createUserProjectDQScore,
  saveMetrics,
  getUrlsByUserId,
  getProjectByIds,
  updateProject,
  deleteProject,
  removeMetricFromProject,
  saveGroupMetric,
  getGroupMetrics,
  saveGroupMetricTheme,
  getMetricGroupsByProjectId,
  getProjectBenchmarks,
  getProjectByDateRangeAndUserId,
  deleteGroupMetricTheme,
  toggleFavorite
};
