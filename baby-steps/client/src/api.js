import axios from 'axios';


export const api = {
  user: {
    authenticate: (cb, catchCb) => {
      axios.get('/api/user/status')
          .then(function(status) {
            cb(status.data);
          })
          .catch(function(response) {
            catchCb(response);
          });
    },
    loadUser: (cb, catchCb) => {
      axios.get('/api/user')
        .then(function(status) {
          cb(status.data);
        })
        .catch(function(response) {
          catchCb(response);
        });
    },
    login: (email, password, cb, catchCb) => {
      axios.post('/login', {
        email: email,
        password: password
      })
      .then(function(status) {
        cb(status.data);
      }).catch(function(response) {
        catchCb(response);
      });
    },
    logout: (cb, catchCb) => {
      axios.get('/api/logout')
        .then(function(status) {
          cb(status.data);
        })
        .catch(function(response) {
          catchCb(response);
        });
    },
    signup: (userInfo, cb, catchCb) => {
      axios.post('/api/signup', userInfo)
        .then(function(status) {
          cb(status.data);
        })
        .catch(function(response) {
          catchCb(response);
        });
    },
    update: (userInfo, cb, catchCb) => {
      axios.post('/api/user/update', userInfo)
      .then(function(status) {
        if (status.status === 200) {
          cb(userInfo);
        }
      })
      .catch(function(response) {
        catchCb(response);
      });
    },
    getChildren: (cb, catchCB) => {
      axios.get('/api/children')
      .then(function(status) {
        cb(status.data);
      })
      .catch(function(response) {
        catchCB(response);
      });
    }
  },
  family: {
    getFamilies: (cb, catchCB) => {
      axios.get('/api/families')
      .then(function(status) {
        cb(status.data);
      })
      .catch(function(response) {
        catchCB(response);
      });
    },
    deleteFamily: (id, cb, catchCB) => {
      axios.post('/api/family/delete', {
        familyId: id
      })
      .then((response)=>{
        cb(response.data);
      })
      .catch((response)=>{
        catchCB(response);
      });
    },
    share: (inviteInfo, cb, catchCb) => {
      axios.post('/api/invite/create', {
        familyId: inviteInfo.familyId,
        inviteEmail: inviteInfo.email
      })
      .then((response)=>{
        cb(response.data);
      })
      .catch((response)=>{
        catchCb(response);
      });
    },
    add: (formData, cb, catchCb) => {
      console.log(formData);
      const config = {
        headers: { 'content-type': 'multipart/form-data' }
      }
      axios.post('/api/family/create', formData, config)
      .then((response)=>{
        if (response.data.message === 'success') {
          cb(response.data);
        } else {
          catchCb(response);  
        }
      })
      .catch((response)=>{
        catchCb(response);
      });
    }
  },
  invites: {
    all: (cb, catchCB) => {
      axios.get('/api/invites')
      .then(response=>{
        cb(response.data);
      })
      .catch(response=>{
        catchCB(response);
      });
    }
  }
}