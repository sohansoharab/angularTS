    // Services do not require component decorator
    // We need to register it in the app module in the provide section
    // Otherwise it will not work
export class CoursesService {
    getCourses(num: number) {
        var a = ["Course_1", "Course_2", "Course_3"];
        return a.slice(0, num);
    }
}