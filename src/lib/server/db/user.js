import { supabase } from "./supabaseClient";

const getUser = (userId) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("user")
      .select()
      .eq("id", userId)
      .maybeSingle()
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res.error);
        }
      });
  });

  return promise;
};

const createUser = (user) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("user")
      .insert({
        ...user,
      })
      .then((res) => {
        if (res.status === 201) {
          resolve();
        } else {
          reject(res.error);
        }
      });
  });

  return promise;
};

const updateUser = (userId, newData) => {
  const promise = new Promise((resolve, reject) => {
    supabase
      .from("user")
      .update({ ...newData })
      .eq("id", userId)
      .then((res) => {
        if (res.status === 204) {
          resolve();
        } else {
          reject(res.error);
        }
      });
  });

  return promise;
};

export { getUser, createUser, updateUser };
