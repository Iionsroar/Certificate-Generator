# Certificate Generator
Web application for generating certificates from a list of names (file formats: .xlsx .csv .tsv .json)

## Wireframe Design
![Wireframe-1](https://github.com/yulyen/certificate_generator/blob/LAdevelop/wireframe.png)
#### ---------------------------------------------------------------------------------------------------------------------
![Wireframe-2](https://github.com/yulyen/certificate_generator/blob/LAdevelop/wireframe-2.png)


## To Do
#### I. Edit Certificate
~~- '#placeholder' modal --> '#edit-certificate' modal~~

~~- '#edit-certificate' --> use slider.js file to store functions related to editing certificate~~

- '#edit-certificate' ~~--> add to generatePreview function: option to specify textAlign of canvas text (reference: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_textalign)~~
                      ~~--> edit button group, see bulma docs~~

~~- CURRENTLY: EDITS FUNCTION --> change exact pixel values (for windows height and width) to percentage~~

- '#edit-certificate.modal': #apply-changes.button
    --> run generatePreview for both previews using window.width_and_height_of_template
    --> open modal  -> make changes, save   -> store current h and v values to window.edit_h_val and etc.
                    -> make changes, cancel -> revert to previous state, the preview and check if the other one also needs -> if previous state is from default (generatePreview), run generatePreview for both edit-cert modal AND card2 w/ the function only differing in the imgSelector parameter
                                                                        -> if previous state is from saved (if global variables for edit_v_and_h are present), run generatePreview for both preview using the stored window.edit-h-and-v variables to generate previews, each w/ diff imgSelector param

- '#edit-certificate.modal': #close-edit.button --> close + prompt
                           : background --> close + prompt

~~- window h and v values --> change to percentage, to be applicable for final generation~~

#### I. Generate Certifi`cates
- #generate.button click
    --> create function for generating high quality certificates, using the settings in edit certificate



ACTIVE COMMENT - currently editing


