/**
 * checkRolePermission.js
 * @description :: middleware that checks logged-in user's access of APIs
 */

const { Op } = require('sequelize');
const model = require('../model');
const dbService = require('../utils/dbService');
const { replaceAll } = require('../utils/common');
const { role } = require('../model');

/**
 * @description : middleware for authentication with role and permission.
 * @param {obj} req : request of route.
 * @param {obj} res : response of route.
 * @param {callback} next : executes the next middleware succeeding the current middleware.
 */
const checkRolePermission = async (req, res, next) => {
  if (req.user) {
    const loggedInUserId = req.user.id;
    let rolesOfUser = await dbService.findMany(model.userRole, {
      userId: loggedInUserId,
      isActive: true,
      isDeleted: false,

    },
    { attributes: ['roleId'] });
    if (rolesOfUser && rolesOfUser.data && rolesOfUser.data.length) {
      rolesOfUser = [...new Set((rolesOfUser.data).map((item) => item.roleId))];
      const route = await dbService.findOne(model.projectRoute, {
        route_name: replaceAll((req.route.path.toLowerCase()).substring(1), '/', '_'),
        uri: req.route.path.toLowerCase(),
      });
      if (route) {
        const allowedRoute = await dbService.findMany(model.routeRole, {

          [Op.and]: [
            { routeId: route.id },
            { roleId: { [Op.in]: rolesOfUser } },
            { isActive: true },
            { isDeleted: false },
          ],

        });
        if (allowedRoute && allowedRoute.data.length) {
          next();
        } else {
          return res.unAuthorizedRequest({ message :'You are not having permission to access this route!' });
        }
      } else {
        next();
      }
    } else {
      // return res.unAuthorizedRequest({message :'You are not having permission to access this route!'});
      next();
    }
  } else {
    return res.unAuthorizedRequest({ message :'Authorization token required!' });
  }
  return undefined;
};

module.exports = checkRolePermission;
