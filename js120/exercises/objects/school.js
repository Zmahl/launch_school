let school = {
  students: [],
  addStudent: function(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].indexOf(year) >= 0) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent: function(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode})
  },

  addGrade: function(student, courseName, grade) {
    let course = student.listCourses().filter(course => {
      return course.name === courseName;
    })[0];

    if (course) {
      course.grade = grade;
    }
  },

  getReportCard: function(student) {
    student.listCourses().forEach(course => {
      if (course.grade) {
        console.log(`${course.name} : ${String(course.grade)}`);
      } else {
        console.log(`${course.name} : In progress`);
      }
    });
  },

  courseReport: function(courseName) {
    function getCourse(student, courseName) {
      return student.listCourses().filter(course => {
        return course.name === courseName;
      })[0];
    }

    let courseStudents = this.students.map(student => {
      let course = getCourse(student, courseName) || { grade: undefined };
      return { name: student.name, grade: course.grade };
    }).filter(student => student.grade);

    if (courseStudents.length > 0) {
      console.log(`= ${courseName} Grades=`);

      let average = courseStudents.reduce((total, student) => {
        console.log(`${student.name} : ${String(student.grade)}`);
        return total + student.grade;
      }, 0) / courseStudents.length;

      console.log('---');
      console.log(`Course Average: ${String(average)}`);
    }
  },
};

function createStudent(name, year) {
  let student = {};

  student.courses = [];
  student.classNotes = {};
  student.info = function() {
    console.log(`${name} is a ${year} year student`);
  }

  student.addCourse = function(course) {
    student.courses.push(course)
  }

  student.addNote = function(code, note) {
    if (this.classNotes.hasOwnProperty(code)) {
      this.classNotes[code].push(note);
    }

    else this.classNotes[code] = [note];
  }

  student.updateNote = function (code, note) {
    this.classNotes[code] = [note];
  }

  student.viewNotes = function() {
    for (const currCourseNum of Object.keys(this.classNotes)) {
      for (let i = 0; i < this.courses.length; i++) {
        if (String(this.courses[i].code) === currCourseNum) {
          console.log(`${this.courses[i].name}: ` + this.classNotes[currCourseNum].join("; "));
          break;
        }
      }
      
    }
  }

  student.listCourses = function() {
    console.log(this.courses);
  }

  return student;
}


let foo = createStudent('Foo', '1st');