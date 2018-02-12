import {Cache} from 'kalix-base'

const companysURL = '/camel/rest/companys'
const studentURL = '/camel/rest/students'

const setCurrentCompany = function (code, callBack) {
  window.Vue.axios.get(companysURL, {
    params: {
      jsonStr: '{"%code%": "' + code + '"}',
      page: 1,
      start: 0,
      limit: 10
    }
  }).then(res => {
    console.log(' === getCurrentCompany === ', res)
    if (res.data.totalCount) {
      let company = res.data.data[0]
      Cache.save('CurrentCompany', JSON.stringify(company))
      typeof (callBack) === 'function' && callBack()
    } else {
      typeof (callBack) === 'function' && callBack()
    }
  })
}
const setCurrentStudent = function (code, callBack) {
  window.Vue.axios.get(studentURL, {
    params: {
      jsonStr: '{"%code%": "' + code + '"}',
      page: 1,
      start: 0,
      limit: 10
    }
  }).then(res => {
    console.log(' === getCurrentStudent === ', res)
    if (res.data.totalCount) {
      console.log(' === getCurrentStudent === ', res)
      let company = res.data.data[0]
      Cache.save('CurrentStudent', JSON.stringify(company))
      typeof (callBack) === 'function' && callBack()
    } else {
      typeof (callBack) === 'function' && callBack()
    }
  })
}
export default {setCurrentCompany, setCurrentStudent}
