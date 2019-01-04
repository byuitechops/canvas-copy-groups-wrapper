# canvas-copy-groups-wrapper
A wrapper to run canvas-copy-groups on a list of courses

You should be able to integrate this into the [canvas-copy-groups](https://github.com/byuitechops/canvas-copy-groups) repo. 
Just add the file, then in the [CLI](https://github.com/byuitechops/canvas-copy-groups/blob/master/cli.js) have an option to run it on one course or on multiple from a csv file. 
If you are running it on multiple courses, then add a spot to input the file path in the [CLI](https://github.com/byuitechops/canvas-copy-groups/blob/master/cli.js).
Then you will either run the copyGroup function from canvas-copy-groups or you will run this module (which needs to export stuff but isn't currently) if running it on multiple courses.

Then after integrating it into the CLI, go into [index.js](https://github.com/byuitechops/canvas-copy-groups-wrapper/blob/master/index.js) for canvas-copy-groups-wrapper and change the copyGroup function to take the delete parameter, instead of hardcoding it to 'true'.

That should be the bulk of merging the two.
