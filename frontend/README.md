npm run build (= npm run npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch) 

img folder(and also .js , .css etc files and folders) have to be put in the directory of .html code.

about static files -> ../ does not apply in the browser url for serving static files and browser just applies img folder(and also .js , .css etc files and folders) with the directory(the directory which we get into from .html code)

dist files are in the nginx file(cuz it can serve them)