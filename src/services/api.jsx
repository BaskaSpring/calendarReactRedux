import axios from "axios";
import authHeader from "./token";

const API_URL = "http://172.26.160.139:8075/api/test/";

class UserService {
    getCalendarDate(){
        return axios.get(API_URL+'getevents',{headers: authHeader() });
    }

    addNewEvent(date,text){
        let trueDate = new Date(date)
        const newDate = trueDate.getDate()+"."+(trueDate.getMonth()+1)+"."+trueDate.getFullYear()
        return axios.post(API_URL+'addevents',{date: newDate, text},{headers: authHeader()});
    }

    deleteEvent(id){
        return axios.post(API_URL+'delevents',{"id": id},{headers: authHeader()});
    }


    editEvent(id,dateBegin,dateEnd,text,status){
        debugger
        let trueDate = new Date(dateBegin)
        const newDateBegin = trueDate.getDate()+"."+(trueDate.getMonth()+1)+"."+trueDate.getFullYear()
        trueDate = new Date(dateEnd)
        const newDateEnd = trueDate.getDate()+"."+(trueDate.getMonth()+1)+"."+trueDate.getFullYear()
        const data = {
            "id": id,
            "dateBegin": newDateBegin,
            "dateEnd": newDateEnd,
            "text": text,
            "status": status,
        }
        return axios.post(API_URL+'editevent',data,{headers: authHeader()});
    }

}

export default new UserService();
