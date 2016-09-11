module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            base: {
                src: ["**/*.ts", "!node_modules/**"],
                dest: "public/app.js"
            }

        },
        watch: {
            files: ["**/*.ts"],
            tasks:"ts",
            options:{
                atBegin : true
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask("default", ["ts"]);
    grunt.registerTask('default', ['watch']);

};