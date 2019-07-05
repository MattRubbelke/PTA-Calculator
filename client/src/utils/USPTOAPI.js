import axios from "axios";

const queryURL = "https://developer.uspto.gov/ibd-api/v1/patent/application?applicationNumber=US"

export default {
    getPatentData: function (appNo) {
        console.log(queryURL+appNo)
        return axios.get(queryURL + appNo);
    }
}