import {
    LuLayoutDashboard,
    LuUsers,
    LuClipboardCheck,
    LuSquarePlus,
    LuLogOut
} from 'react-icons/lu'

export const SIDE_MENU_DATA =[
    {
        id: 1,
        title: 'Dashboard',
        icon: LuLayoutDashboard,
        link: '/admin/dashboard'
    },
    {
        id: 2,
        title: 'Team Members',
        icon: LuUsers ,
        link: '/admin/users'
    },
    {
        id: 3,
        title: 'Tasks',
        icon: LuClipboardCheck ,
        link: '/admin/tasks'
    },
    {
        id: 4,
        title: 'Create Task',
        icon: LuSquarePlus ,
        link: '/admin/create-task'
    },
    {
        id: 5,
        title: 'Logout',
        icon: LuLogOut ,
        link: 'logout'
    }
]

export const SIDE_MENU_USER_DATA =[
    {
        id: 1,
        title: 'Dashboard',
        icon: LuLayoutDashboard ,
        link: '/user/dashboard'
    },
    {
        id: 2,
        title: 'Tasks',
        icon: LuClipboardCheck ,
        link: '/user/tasks'
    },
    {
        id: 3,
        title: 'Logout',
        icon: LuLogOut ,
        link: 'logout'
    }
]

export const PRIORITY_DATA = [
    {label :"Low", value: "low"},
    {label :"Medium", value: "medium"},
    {label :"High", value: "high"}
]
export const STATUS_DATA = [
    {label: "Pending", value: "Pending"},
    {label: "In Progress", value: "In Progress"},
    {label: "Completed", value: "Completed"},
]