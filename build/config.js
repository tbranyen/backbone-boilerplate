// Add your custom task options here...
config.init({

  lint: {
    files: ["build/config.js", "app/modules/*.js"]
  },

  concat: {
    "dist/debug/libs.js": ["assets/js/libs/*.js"],
    "dist/debug/modules.js": ["app/modules/*.js"]
  },
  
  jst: {
    "dist/debug/templates.js": ["app/templates/*.html"]
  },

  min: {
    "dist/release/libs.min.js": ["dist/debug/libs.js"],
    "dist/release/modules.min.js": ["dist/debug/modules.js"],
    "dist/release/templates.min.js": ["dist/debug/templates.js"]
  },

  mincss: {
    "dist/release/style.css": ["assets/css/style.css"]
  },

  watch: {
    files: ["assets/**/*", "app/**/*"],
    tasks: "lint:files concat jst"
  }

});

// Run the following tasks...
task.registerTask("default", "lint:files concat jst min mincss");
