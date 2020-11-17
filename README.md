# Certificate Generator
Web application for generating certificates from a list of names (file formats: .xlsx .csv .tsv .json)

## Wireframe Design
![Wireframe-1](https://github.com/yulyen/certificate_generator/blob/LAdevelop/wireframe.png)
#### ---------------------------------------------------------------------------------------------------------------------
![Wireframe-2](https://github.com/yulyen/certificate_generator/blob/LAdevelop/wireframe-2.png)





## TO DO
1. Hide edit-certificate button, show only when the user has supplied the certificate template and the certificate image

#### I. Edit-Certificate
1. Setup font family setting
2. Setup font style setting
3. When all names are removed, restore default settings for certificate name text (global variables, i.e. window.font_family)
4. If changes are made in the editing box (window/ modal), and the user clicks at the background or at the close button, prompt for confirmation 

*messy additional info
- '#edit-certificate.modal': #apply-changes.button
    --> run generatePreview for both previews using window.width_and_height_of_template
    --> open modal  -> make changes, save   -> store current h and v values to window.edit_h_val and etc.
                    -> make changes, cancel -> revert to previous state, the preview and check if the other one also needs -> if previous state is from default (generatePreview), run generatePreview for both edit-cert modal AND card2 w/ the function only differing in the imgSelector parameter                                               ->aasaksjaksaa if previous state is from saved (if global variables for edit_v_and_h are present), run generatePreview for both preview using the stored window.edit-h-and-v variables to generate previews, each w/ diff imgSele

#### II. Generate Certificates
1. Upon #generate.button click: 
    --> call function for generating high quality certificates, using the global variables for the text styling


#### III. New (Not Pushed)
1. Bugs when reading csv and xlsx files
2. When first set of names is added,change file upload text to: Add another file etc.





Traps and Deadlines --------------------------------------------

#### PLAN
A. ojt does full image generation function, w/ print and png to pdf functionality as well as an optional pdf download

B. lead lays final functionality framework as guide to ojt and does small bug fixes and code polishing
	- NEW MODAL for storing high quality canvas, based on certificate image size
	- NEW RIP-OFF generate function from generatePreview with a well designed structure, keeping in mind window variables and constants
	- learn jsPDF, particularly how to import lol it's ughly complicated
	see demo: http://raw.githack.com/MrRio/jsPDF/master/
	https://github.com/MrRio/jsPDF
	https://stackoverflow.com/questions/38587264/getting-error-uncaught-referenceerror-jspdf-is-not-defined/38631126
	https://stackoverflow.com/questions/43333286/uncaught-referenceerror-jspdf-is-not-defined
	https://stackoverflow.com/questions/42237388/syntaxerror-import-declarations-may-only-appear-at-top-level-of-a-module
	https://jakearchibald.com/2017/es-modules-in-browsers/
	
