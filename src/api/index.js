const base_URL = "https://strangers-things.herokuapp.com";
const COHORT_NAME = "2112-FTB-ET-WEB-PT";

export const registerUser = async (userObject) => {
  const url = `${base_URL}/api/${COHORT_NAME}/users/register`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  console.log(response);

  const json = await response.json();
  console.log(json);

  localStorage.setItem("stranger_things_JWT", json.data.token);

  return json;
};

export const loginAsUser = async (userObject) => {
  const url = `${base_URL}/api/${COHORT_NAME}/users/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  const json = await response.json();
  console.log(json);

  localStorage.setItem("stranger_things_JWT", json.data.token);
};

export const getMe = async () => {
  const url = `${base_URL}/api/${COHORT_NAME}/users/me`;
  const response = await fetch(url);

  const json = await response.json();
  return json;
};

export const testMe = async () => {
  // URL that we're gonna reach out to
  const url = `${base_URL}/api/${COHORT_NAME}/test/me`;
  const token = localStorage.getItem("stranger_things_JWT");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  //Take the body we got back and convert it to JS Object
  const json = await response.json();
  console.log(json);

  return json;
};

export const getPosts = async () => {
  // URL that we're gonna reach out to
  const url = `${base_URL}/api/${COHORT_NAME}/posts`;

  // Grab the body given back by the API
  const response = await fetch(url);
  console.log(response);

  // Take the body we got back and convert it to JS Object
  const json = await response.json();
  console.log(json);

  return json.data.posts;
};

export const createNewPost = async (pBody) => {
  const url = `${base_URL}/api/${COHORT_NAME}/posts`;
  const token = localStorage.getItem("stranger_things_JWT");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pBody),
  });

  const json = await response.json();
  console.log(json);
  return json;
};

export const updateNewPost = async (newPost) => {
  const url = `${base_URL}/api/${COHORT_NAME}/posts`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  const json = await response.json();
  console.log(json);
  return json;
};

export const deletePostById = async (postId) => {
  const url = `${base_URL}/api/${COHORT_NAME}/${postId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  const json = await response.json();
  console.log(json);
  return json;
};

export const createNewMessage = async (postId, userObject) => {
  const url = `${base_URL}/api/${COHORT_NAME}/posts/${postId}/messages`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  });

  const json = await response.json();
  return json;
};
