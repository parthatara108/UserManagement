import axios from 'axios'

export async function fetchUsers(sort, pagination) {
  let queryString = ''

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  return await axios.get('/user/?' + queryString)
    .then(response => {
      const totalUsers = response.headers['x-total-count'];
      return { data: { users: response.data, totalUsers: totalUsers } };
    })
}

export function fetchUserById(id) {
  return axios.get('/user/' + id)
}
export function createUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/user', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

  })

}
export function updateUser(update) {
  return axios.patch('/user/' + update.id, update)
}
export function deleteUser(id) {
  return axios.delete('/user/' + id)
}