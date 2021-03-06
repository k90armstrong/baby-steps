import axios from 'axios';

const headerConfig = {
  headers: { 'content-type': 'multipart/form-data' }
}


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
      axios.post('/api/family/create', formData, headerConfig)
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
    },
    respond: (inviteId, accept, cb, catchCb) => {
      axios.post('/api/invite/respond', {inviteId, accept})
      .then(response=>{
        if (response.data.message === 'success') {
          cb(response.data);
        } else {
          catchCb(response);
        }
      })
      .catch(()=>{
        catchCb();
      });
    }
  },
  child: {
    add: (formData, cb, catchCb) => {
      axios.post('/api/child/create', formData, headerConfig)
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
    },
    load: (id, cb, catchCb) => {
      axios.get('/api/child/'+id)
      .then((response) =>{
        cb(response.data);
      })
      .catch(()=>{
        catchCb();
      })
    },
    getEvents: (cb, catchCb) => {
      axios.get('/api/child')
      .then((events)=>{
        cb(events)
      })
      .catch((response)=>{
        catchCb(response)
      })
    }
  },
  event: {
    add: (formData, cb, catchCb) => {
      axios.post('/api/events', formData, headerConfig)
      .then((response)=>{
        console.log(response.data);
        if (response.data.message === 'success') {
          console.log(response.data.message);          
          cb(response.data);
        } else {
          catchCb(response);  
        }
      })
      .catch((response)=>{
        console.log('err');
        catchCb(response);
      });
    }
  }
}