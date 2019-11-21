import axios from '../../src/index'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

document.cookie = 'a=b'

axios.get('/more/get').then(res => {
  console.log(res)
})

axios
  .post(
    'http://127.0.0.1:8088/more/server2',
    {},
    {
      withCredentials: true
    }
  )
  .then(res => {
    console.log(res)
  })

const instance = axios.create({
  xsrfCookieName: 'XSRF_TOKEN_D',
  xsrfHeaderName: 'X_XSRF_TOKEN_D'
})

instance.get('/more/get').then(res => {
  console.log(res)
})

const newInstance = axios.create()

function calculatePercentage(loaded: number, total: number): number {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    newInstance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }
  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    newInstance.defaults.onDownloadProgress = update
    newInstance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    newInstance.interceptors.response.use(
      response => {
        NProgress.done()
        return response
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}
loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl.addEventListener('click', e => {
  newInstance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])
    newInstance.post('/more/upload', data)
  }
})

axios
  .post(
    '/more/post',
    { a: 1 },
    {
      auth: {
        username: 'haha',
        password: '12345'
      }
    }
  )
  .then(res => {
    console.log(res)
  })

axios
  .get('/more/304')
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e.message)
  })

axios
  .get('/more/304', {
    validateStatus(status) {
      return status >= 200 && status < 400
    }
  })
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e.message)
  })
