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
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"