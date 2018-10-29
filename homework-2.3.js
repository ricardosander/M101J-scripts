//Write a program in the language of your choice that will remove the grade of type "homework" with the lowest score for each student from the dataset in the handout. Since each document is one grade, //it should remove one document per student. This will use the same data set as the last problem, but if you don't have it, you can download and re-import.

//db.grades.find({}).sort({student_id: 1}).pretty();

function doIt() {
	var students = db.grades.find({}).sort({student_id: 1, score : 1});
	var student = null;
	var lastStudentId = -1;
	var lastStudentIdRemoved = -1;
	while (students.hasNext()) {
		
		student = students.next();

		if (student.student_id != lastStudentIdRemoved) {
			if (student.student_id != lastStudentId) {
				print("Student : " + student.student_id);
			}
			if (student.type == "homework") {
				print("Type : " + student.type);
				print("Score : " + student.score);
				db.grades.deleteOne({"_id" : student._id});
				lastStudentIdRemoved = student.student_id;	
			}
		}
		lastStudentId = student.student_id;
	}
}
doIt();