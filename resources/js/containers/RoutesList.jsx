// Views
import HomeView from './../views/HomeView';

// Auth Views
import LoginView from './../views/user/auth/LoginView';
//import RegisterView from './../views/user/auth/RegisterView';

// Acount Views
import MyAccountView from './../views/user/account/MyAccountView';
import EditMyAccountView from './../views/user/account/EditMyAccountView';
import LogoutView from './../views/user/auth/LogoutView';

// Reports Views
import ReportsView from './../views/reports/ReportsView';
import CreateReportView from './../views/reports/CreateReportView';
import ShowReportView from './../views/reports/ShowReportView';
import EditReportView from './../views/reports/EditReportView';
import DestroyReportView from './../views/reports/DestroyReportView';


// Core Views 
import RolesView from './../views/core/roles/RolesView';
import CreateRoleView from './../views/core/roles/CreateRoleView';
import ShowRoleView from './../views/core/roles/ShowRoleView';
import EditRoleView from './../views/core/roles/EditRoleView';
import DestroyRoleView from './../views/core/roles/DestroyRoleView';

import GroupsView from './../views/core/groups/GroupsView';
import CreateGroupView from './../views/core/groups/CreateGroupView';
import ShowGroupView from './../views/core/groups/ShowGroupView';
import EditGroupView from './../views/core/groups/EditGroupView';
import DestroyGroupView from './../views/core/groups/DestroyGroupView';
import RemoveUserFromGroupView from './../views/core/groups/RemoveUserFromGroupView';

import UsersView from './../views/core/users/UsersView';
import CreateUserView from './../views/core/users/CreateUserView';
import ShowUserView from './../views/core/users/ShowUserView';
import EditUserView from './../views/core/users/EditUserView';
import DestroyUserView from './../views/core/users/DestroyUserView';
import RemoveGroupFromUserView from './../views/core/users/RemoveGroupFromUserView';

const RoutesList = [
    {name: 'home', path: '/', view: HomeView, userStatus: ''},

    // User Routes
    {name: 'user.auth.login', path: '/user/auth/login', view: LoginView, userStatus: 'guest'},
    {name: 'user.my-account', path: '/user/my-account', view: MyAccountView, userStatus: 'auth'},
    {name: 'user.my-account.edit', path: '/user/my-account/edit', view: EditMyAccountView, userStatus: 'auth'},
    {name: 'user.auth.logout', path: '/user/auth/logout', view: LogoutView, userStatus: 'auth'},


    // Reports Routes
    {name: 'reports.index', path: '/reports', view: ReportsView, userStatus: 'auth', permissionName: 'reports_view_reports'},
    {name: 'reports.create', path: '/reports/create', view: CreateReportView, userStatus: 'auth', permissionName: 'reports_add_reports'},
    {name: 'reports.show', path: '/reports/:id/show', view: ShowReportView, userStatus: 'auth', permissionName: 'reports_view_reports'},
    {name: 'reports.edit', path: '/reports/:id/edit', view: EditReportView, userStatus: 'auth', permissionName: 'reports_edit_reports'},
    {name: 'reports.destroy', path: '/reports/:id/destroy', view: DestroyReportView, userStatus: 'auth', permissionName: 'reports_delete_reports'},

    // Core Routes (for admin)

    {name: 'core.roles.index', path: '/core/roles', view: RolesView, userStatus: 'auth', permissionName: 'core_view_roles'},
    {name: 'core.roles.create', path: '/core/roles/create', view: CreateRoleView, userStatus: 'auth', permissionName: 'core_add_roles'},
    {name: 'core.roles.show', path: '/core/roles/:id/show', view: ShowRoleView, userStatus: 'auth', permissionName: 'core_view_roles'},
    {name: 'core.roles.edit', path: '/core/roles/:id/edit', view: EditRoleView, userStatus: 'auth', permissionName: 'core_edit_roles'},
    {name: 'core.roles.destroy', path: '/core/roles/:id/destroy', view: DestroyRoleView, userStatus: 'auth', permissionName: 'core_delete_roles'},

    {name: 'core.groups.index', path: '/core/groups', view: GroupsView, userStatus: 'auth', permissionName: 'core_view_groups'},
    {name: 'core.groups.create', path: '/core/groups/create', view: CreateGroupView, userStatus: 'auth', permissionName: 'core_add_groups'},
    {name: 'core.groups.show', path: '/core/groups/:id/show', view: ShowGroupView, userStatus: 'auth', permissionName: 'core_view_groups'},
    {name: 'core.groups.edit', path: '/core/groups/:id/edit', view: EditGroupView, userStatus: 'auth', permissionName: 'core_edit_groups'},
    {name: 'core.groups.destroy', path: '/core/groups/:id/destroy', view: DestroyGroupView, userStatus: 'auth', permissionName: 'core_delete_groups'},
    {name: 'core.groups.remove-user', path: '/core/groups/:id/:user_id/remove-user', view: RemoveUserFromGroupView, userStatus: 'auth', permissionName: 'core_delete_user_from_group_groups'},
    
    {name: 'core.users.index', path: '/core/users', view: UsersView, userStatus: 'auth', permissionName: 'core_view_users'},
    {name: 'core.users.create', path: '/core/users/create', view: CreateUserView, userStatus: 'auth', permissionName: 'core_add_users'},
    {name: 'core.users.show', path: '/core/users/:id/show', view: ShowUserView, userStatus: 'auth', permissionName: 'core_view_users'},
    {name: 'core.users.edit', path: '/core/users/:id/edit', view: EditUserView, userStatus: 'auth', permissionName: 'core_edit_users'},
    {name: 'core.users.destroy', path: '/core/users/:id/destroy', view: DestroyUserView, userStatus: 'auth', permissionName: 'core_delete_users'},
    {name: 'core.users.remove-group', path: '/core/users/:id/:group_id/remove-group', view: RemoveGroupFromUserView, userStatus: 'auth', permissionName: 'core_delete_group_from_user_users'},
];



export default RoutesList;