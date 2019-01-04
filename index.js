const copyGroups = require('canvas-copy-groups');
const d3 = require('d3-dsv');
const fs = require('fs');
const path = require('path');
const canvas = require('canvas-api-wrapper');

function getCsvData() {
	const file = path.resolve('../Winter2019onlineScaledCoursesGroupReport_1546550796400.csv');
	const fileData = fs.readFileSync(file, 'utf8');
	let courses = d3.csvParse(fileData);

	// only get the courses that you want
	let coursesToRun = courses.filter(course => {
		if  (course.id !== '39016' &&
		(course.groupCategories.includes('|Project Groups|') ||
		course.groupCategories === 'Project Groups|' ||
		course.groupCategories === 'Grupos de Projeto|')) {
			return course;
		}
	});

	// sort the courses by name alphabetically because 
	// of how we get the blueprint course id inside of runCourses
	coursesToRun.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});

	return coursesToRun;
}

// these directories must exist to write the log reports
function makeDirectories() {
	if (!fs.existsSync(path.resolve('./htmlReport'))) {
		fs.mkdirSync(path.resolve('./htmlReport'));
	}
	
	if (!fs.existsSync(path.resolve('./jsonReport'))) {
		fs.mkdirSync(path.resolve('./jsonReport'));
	}
}

async function runCourses() {
	let parentId;
	let courseName;
	let coursesToRun = getCsvData();
	makeDirectories();

	for (let i = 0; i < coursesToRun.length; i++) {
		// only do a get request for the blueprint course if you are running a new course
		// else keep the same blueprint for the various sections of the course
		if (courseName !== coursesToRun[i].name) {
			courseName = coursesToRun[i].name;
			let blueprint = await canvas.get(`/api/v1/courses/${coursesToRun[i].id}/blueprint_subscriptions`);
			parentId = blueprint[0].blueprint_course.id;
		}
		// run the bulk of the code for each section of each course
		copyGroups(parentId, coursesToRun[i].id, true);
	}
}

runCourses();