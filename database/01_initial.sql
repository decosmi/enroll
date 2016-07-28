DROP TABLE IF EXISTS student_guardian;
DROP TABLE IF EXISTS school_admin;
DROP TABLE IF EXISTS guardians;
DROP TABLE IF EXISTS emergency;
DROP TABLE IF EXISTS student_emergency;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teacher;





CREATE TABLE teacher (
	id 				serial PRIMARY KEY,
 	first_name 		text,
 	last_name		text
);

ALTER TABLE teacher OWNER TO school;

CREATE TABLE guardians (
	id 					serial PRIMARY KEY,
 	first_name			text	NOT NULL,
	last_name			text	NOT NULL,
	id_token			text	NOT NULL,	
	home_address		text,
	home_city			text,
	home_state			text,
	home_zip			integer,
	email				text,
	cell_phone			text,
	home_phone			text, 
	work_phone			text,	
	work_name			text,
	work_address		text,
	work_city			text,
	work_state			text,
	work_zip			text,
	work_email			text
);

ALTER TABLE guardians OWNER TO school;

CREATE TABLE students (
	id     			serial PRIMARY KEY,
	first_name		text	NOT NULL,
	middle_name		text,
	last_name		text,
	birthdate		text,
	gender			text,
	social_security	text,
	race_ethnicity	text,
	home_address	text,
	home_city		text,
	home_state		text,
	home_zip		integer,
	phone 			text,
	teacher			integer,

	CONSTRAINT fk_from_teacher_to_students		 
	FOREIGN KEY (teacher)
	REFERENCES teacher(id)
);

ALTER TABLE students OWNER TO school;

CREATE TABLE student_guardian (
	id 				serial PRIMARY KEY,
	student_first	text,
 	student_id 		integer,
 	guardian_id 	integer,
 	rel_to_student	text,	
	

	CONSTRAINT fk_from_students_to_student_guardian		 
	FOREIGN KEY (student_id)
	REFERENCES students(id),

	CONSTRAINT fk_from_guardians_to_student_guardians		 
	FOREIGN KEY (guardian_id)
	REFERENCES guardians(id)
);

ALTER TABLE student_guardian OWNER TO school;

CREATE TABLE emergency (
	id 					serial PRIMARY KEY,
 	first_name			text	NOT NULL,
	last_name			text	NOT NULL,	
	email				text,
	cell_phone			integer,
	home_phone			integer, 
	work_phone			integer,	
	work_name			text,
	work_address		text	
);

ALTER TABLE emergency OWNER TO school;

CREATE TABLE student_emergency (
	id 				serial PRIMARY KEY,
 	student_id 		integer,
 	contact_id 		integer,	
	

	CONSTRAINT fk_from_students_to_ec		 
	FOREIGN KEY (student_id)
	REFERENCES students(id),

	CONSTRAINT fk_from_ec_to_student_emergency		 
	FOREIGN KEY (contact_id)
	REFERENCES student_emergency(id)
);

ALTER TABLE student_emergency OWNER TO school;



CREATE TABLE school_admin (
	id 				serial PRIMARY KEY,
 	first_name 		text,
 	last_name		text
);

ALTER TABLE school_admin OWNER TO school;
