import {store,retrieve,checkStorage} from "./storage.js"
import { getAllCourses } from "../js/query";

export async function collect() {
    const courses =  getAllCourses();
    const data = {};
    if(courses.length>0){
        courses.forEach(course => {
            //이 부분이 {} 이걸로 object로 만드는데 왜 계속 Array일까요
            if(!data[course.getProgram()]){
                data[course.getProgram()] = {};
            }
            var sectionData = {};
            course.getSections().forEach(section=>{
                sectionData[section.getSection()]=section.getProfessorName();
            })
            data[course.getProgram()][course.getCourseNumber()] = {}
            data[course.getProgram()][course.getCourseNumber()] = sectionData;
            
        });
        store('courseData',data)
    }
    else{
        return undefined
    }
  

   
}

export async function getCourseData() {
    if (await checkStorage('courseData') == true){
        var data = await retrieve('courseData');
        return data
    }
       
    return false;
}


