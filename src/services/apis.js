const BASE_URL = import.meta.env.VITE_EXPRESS_API_BASE_URL;

console.log("Base url of api ", BASE_URL);

//-------------------------------All blog apis -----------------------

export const blogApiEndPoint = {
  CREATE_BLOG: `${BASE_URL}/blog/create-blog`,
  GET_ALL_BLOGS: `${BASE_URL}/blog/get-all-blogs`,
  GET_BLOG_BY_ID: `${BASE_URL}/blog/get-single-blog`,
  DELETE_BLOG_BY_ID: `${BASE_URL}/blog/delete-blog`,
  UPDATE_BLOG_BY_ID: `${BASE_URL}/blog/update-blog`,
};

//-----------------------------cms apis -----------------------------

export const cmsApiEndPoint = {
  GET_TERM_CONDITION: `${BASE_URL}/cms/get-single-cms/term-condition`,
  GET_ABOUT_US: `${BASE_URL}/cms/get-single-cms/about-us`,
  GET_PRIVACY_POLICY: `${BASE_URL}/cms/get-single-cms/privacy-policy`,
  GET_FAQ: `${BASE_URL}/cms/get-single-cms/faq`,

  UPDATE_CMS: `${BASE_URL}/cms/update-cms`,
};

//------------------------------------user apis ---------------------------

export const usersApiEndPoint = {
  GET_ALL_USERS: `${BASE_URL}/user/user-list`,
  GET_USER_BY_ID: (id) => `${BASE_URL}/user/user-view/${id}`,
};

//------------------------------------plan apis ---------------------------

export const plansApiEndPoint = {
  GET_ALL_PLANS: `${BASE_URL}/plan/plan-list`,
  GET_PLAN_BY_ID: (id) => `${BASE_URL}/plan/view-plan/${id}`,
  CREATE_PLAN: `${BASE_URL}/plan/create-plan`,
  UPDATE_PLAN_BY_ID: `${BASE_URL}/plan/update-plan`,
  DELETE_PLAN_BY_ID: `${BASE_URL}/plan/delete-plan`,
};

//------------------------- all notification api ---------------------------------------

export const notificationApiEndPoint = {
  GET_ALL_NOTIFICATIONS: `${BASE_URL}/notification/list`,
  CREATE_NOTIFICATION: `${BASE_URL}/notification/add`,
  GET_NOTIFICATION_BY_ID: (id) => `${BASE_URL}/notification/view/${id}`,
  UPDATE_NOTIFICATION_BY_ID: (id) => `${BASE_URL}/notification/edit/${id}`,
  DELETE_NOTIFICATION_BY_ID: (id) => `${BASE_URL}/notification/delete/${id}`,
  CHANGE_NOTIFICATION_STATUS: (id) => `${BASE_URL}/notification/${id}`,
};

export const categoryApiEndPoint = {
  GET_ALL_CATEGORIES: `${BASE_URL}/category/all-category`,
  GET_CATEGORY_BY_ID: (id) => `${BASE_URL}//category/view-category/${id}`,
  CREATE_CATEGORY: `${BASE_URL}/category/create-category`,
  UPDATE_CATEGORY_BY_ID: (id) => `${BASE_URL}/category/update-category${id}`,
  // DELETE_CATEGORY_BY_ID: `${BASE_URL}/category/delete-category`,
};

//-----------------------------dashboard apis -----------------------

export const dashboardApiEndPoint = {
  GET_DASHBOARD_DATA: `${BASE_URL}/dashboard`,
};

//-------------------------------All listening apis -----------------------

export const listeningApiEndPoint = {
  GET_ALL_LISTENING: `${BASE_URL}/listening/list`,
  GET_LISTENING_BY_ID: (id) => `${BASE_URL}/listening/view/${id}`,
  CREATE_LISTENING: `${BASE_URL}/listening/create-listening`,
  UPDATE_LISTENING_BY_ID: (id) => `${BASE_URL}/listening/update/${id}`,
  UPDATE_LISTENING_STATUS: (id) => `${BASE_URL}/listening/change-status/${id}`, 
  DELETE_LISTENING_BY_ID: (id) => `${BASE_URL}/listening/delete/${id}`,

};

//-------------------------------All listening item apis -----------------------

export const listeningItemApiEndPoint = {

  //--------- base on single  Listening Id------------ 

 GET_ALL_LISTENING_ITEMS_BY_LISTENING_ID:(id) =>  `${BASE_URL}/listening-item/list/${id}`,

 //-----------------------Listening Item Id based -------------------------------
 GET_SINGLE_LISTENING_ITEM_BY_ID: (id) => `${BASE_URL}/listening-item/view/${id}`,

 CREATE_LISTENING_ITEM: `${BASE_URL}/listening-item/create`,
 UPDATE_LISTENING_ITEM_BY_ID: (id) => `${BASE_URL}/listening-item/update/${id}`,
 UPDATE_LISTENING_ITEM_STATUS_BY_ID: (id) => `${BASE_URL}/listening-item/change-status/${id}`,
 DELETE_LISTENING_ITEM_BY_ID: (id) => `${BASE_URL}/listening-item/delete/${id}`,
}



//-------------------------------All listening question apis -----------------------

export const listeningQuestionApiEndPoint = {
  GET_ALL_LISTENING_QUESTIONS:(id) => `${BASE_URL}/listening-question/list/${id}`,
  GET_SINGLE_LISTENING_QUESTION_BY_ID: (id) => `${BASE_URL}/listening-question/view/${id}`,
  CREATE_LISTENING_QUESTION: `${BASE_URL}/listening-question/create`,
  UPDATE_LISTENING_QUESTIONS_BY_ID: (id) => `${BASE_URL}/listening-question/update/${id}`,
  UPDATE_LISTENING_QUESTIONS_STATUS_BY_ID: (id) => `${BASE_URL}/listening-question/change-status/${id}`,
  DELETE_LISTENING_QUESTIONS_BY_ID: (id) => `${BASE_URL}/listening-question/delete/${id}`,
}


