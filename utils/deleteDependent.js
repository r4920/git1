/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserToken = require('../model/userToken');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');
const { Op } = require('sequelize');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user && user.length){
      user = user.map((obj) => obj.id);
      const BlogFilter5033 = { 'updatedBy': { [Op.in]: user } };
      const Blog0980 = await deleteBlog(BlogFilter5033);
      const BlogFilter2042 = { 'addedBy': { [Op.in]: user } };
      const Blog4680 = await deleteBlog(BlogFilter2042);
      const userFilter9959 = { 'addedBy': { [Op.in]: user } };
      const user3620 = await deleteUser(userFilter9959);
      const userFilter0559 = { 'updatedBy': { [Op.in]: user } };
      const user1027 = await deleteUser(userFilter0559);
      const userAuthSettingsFilter5116 = { 'userId': { [Op.in]: user } };
      const userAuthSettings6796 = await deleteUserAuthSettings(userAuthSettingsFilter5116);
      const userAuthSettingsFilter0889 = { 'addedBy': { [Op.in]: user } };
      const userAuthSettings7498 = await deleteUserAuthSettings(userAuthSettingsFilter0889);
      const userAuthSettingsFilter1540 = { 'updatedBy': { [Op.in]: user } };
      const userAuthSettings9815 = await deleteUserAuthSettings(userAuthSettingsFilter1540);
      const userTokenFilter0299 = { 'userId': { [Op.in]: user } };
      const userToken2481 = await deleteUserToken(userTokenFilter0299);
      const userTokenFilter9259 = { 'addedBy': { [Op.in]: user } };
      const userToken8507 = await deleteUserToken(userTokenFilter9259);
      const userTokenFilter1013 = { 'updatedBy': { [Op.in]: user } };
      const userToken1449 = await deleteUserToken(userTokenFilter1013);
      const userRoleFilter8679 = { 'userId': { [Op.in]: user } };
      const userRole9041 = await deleteUserRole(userRoleFilter8679);
      return await User.destroy({ where :filter });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    return await UserAuthSettings.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserToken = async (filter) =>{
  try {
    return await UserToken.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role && role.length){
      role = role.map((obj) => obj.id);
      const routeRoleFilter8698 = { 'roleId': { [Op.in]: role } };
      const routeRole4568 = await deleteRouteRole(routeRoleFilter8698);
      const userRoleFilter1735 = { 'roleId': { [Op.in]: role } };
      const userRole2620 = await deleteUserRole(userRoleFilter1735);
      return await Role.destroy({ where :filter });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);
      const routeRoleFilter0716 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole2902 = await deleteRouteRole(routeRoleFilter0716);
      return await ProjectRoute.destroy({ where :filter });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.destroy({ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
    const BlogCnt =  await Blog.count(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const BlogFilter = { [Op.or]: [{                    updatedBy : { [Op.in] : user } },{                    addedBy : { [Op.in] : user } }] };
      const BlogCnt =  await dbService.count(Blog,BlogFilter);

      const userFilter = { [Op.or]: [{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { [Op.or]: [{                    userId : { [Op.in] : user } },{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokenFilter = { [Op.or]: [{                    userId : { [Op.in] : user } },{                    addedBy : { [Op.in] : user } },{                    updatedBy : { [Op.in] : user } }] };
      const userTokenCnt =  await dbService.count(UserToken,userTokenFilter);

      const userRoleFilter = { [Op.or]: [{                    userId : { [Op.in] : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userToken : userTokenCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await UserAuthSettings.count(filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserToken = async (filter) =>{
  try {
    const userTokenCnt =  await UserToken.count(filter);
    return { userToken : userTokenCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { [Op.or]: [{                    roleId : { [Op.in] : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { [Op.or]: [{                    roleId : { [Op.in] : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { [Op.or]: [{                    routeId : { [Op.in] : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.count(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.count(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (user && user.length){
      user = user.map((obj) => obj.id);
      const BlogFilter4706 = { 'updatedBy': { [Op.in]: user } };
      const Blog7419 = await softDeleteBlog(BlogFilter4706,updateBody);
      const BlogFilter7274 = { 'addedBy': { [Op.in]: user } };
      const Blog5981 = await softDeleteBlog(BlogFilter7274,updateBody);
      const userFilter6246 = { 'addedBy': { [Op.in]: user } };
      const user0585 = await softDeleteUser(userFilter6246,updateBody);
      const userFilter9021 = { 'updatedBy': { [Op.in]: user } };
      const user5485 = await softDeleteUser(userFilter9021,updateBody);
      const userAuthSettingsFilter1393 = { 'userId': { [Op.in]: user } };
      const userAuthSettings2787 = await softDeleteUserAuthSettings(userAuthSettingsFilter1393,updateBody);
      const userAuthSettingsFilter2392 = { 'addedBy': { [Op.in]: user } };
      const userAuthSettings9125 = await softDeleteUserAuthSettings(userAuthSettingsFilter2392,updateBody);
      const userAuthSettingsFilter1586 = { 'updatedBy': { [Op.in]: user } };
      const userAuthSettings3748 = await softDeleteUserAuthSettings(userAuthSettingsFilter1586,updateBody);
      const userTokenFilter2602 = { 'userId': { [Op.in]: user } };
      const userToken3095 = await softDeleteUserToken(userTokenFilter2602,updateBody);
      const userTokenFilter5214 = { 'addedBy': { [Op.in]: user } };
      const userToken3082 = await softDeleteUserToken(userTokenFilter5214,updateBody);
      const userTokenFilter4758 = { 'updatedBy': { [Op.in]: user } };
      const userToken3619 = await softDeleteUserToken(userTokenFilter4758,updateBody);
      const userRoleFilter0012 = { 'userId': { [Op.in]: user } };
      const userRole1361 = await softDeleteUserRole(userRoleFilter0012,updateBody);
      return await User.update({
        ...updateBody,
        ...defaultValues
      },{ where: filter });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserAuthSettings.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserToken = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserToken.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (role && role.length){
      role = role.map((obj) => obj.id);
      const routeRoleFilter2491 = { 'roleId': { [Op.in]: role } };
      const routeRole8590 = await softDeleteRouteRole(routeRoleFilter2491,updateBody);
      const userRoleFilter1593 = { 'roleId': { [Op.in]: role } };
      const userRole9970 = await softDeleteUserRole(userRoleFilter1593,updateBody);
      return await Role.update({
        ...updateBody,
        ...defaultValues
      },{ where: filter });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.findAll({
      where:filter,
      attributes:{ include:'id' }
    });
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);
      const routeRoleFilter3912 = { 'routeId': { [Op.in]: projectroute } };
      const routeRole2299 = await softDeleteRouteRole(routeRoleFilter3912,updateBody);
      return await ProjectRoute.update({
        ...updateBody,
        ...defaultValues
      },{ where: filter });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.update({
      ...updateBody,
      ...defaultValues
    },{ where: filter });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserToken,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserAuthSettings,
  countUserToken,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserToken,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
