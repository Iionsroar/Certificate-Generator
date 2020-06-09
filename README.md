# certificate_generator
Web application for generating certificates from a list of names (file formats: .xlsx .csv .tsv .json)

## Wireframe Design
![Wireframe](https://github.com/yulyen/certificate_generator/blob/LAdevelop/wireframe.png)

## Certificate class
##### Create a certificate object with fields that provide information such as:
* the templateFile (certificate img) to be used
* name to be written on template
* filename to be saved
* fontfile to use & fontsize
* vertical coordinate to place the name on the template
##### With methods:
* generate(destination=defaultsToCurrentDirectory) - generates certificate and saves (destination defaults to current dir)
* openImg(appPath=pathnameForAppToUse) - opens generated certificate (appPath defaults to mspaint.exe)
* closeImg()
##### Sample:
```python
from certificate_gen import Certificate
certificate = Certificate('src/certificate_template_1.png', 'Draco Malfoy') # create a Certificate object
print(certificate.templateFile) # access certificate template filename
print(certificate.name) # name
print(certificate.filename) # processed name for saving file
print(certificate.fontFile, certificate.fontSize)
print(certificate.vPosCoordinate) # vertical alignment for positioning name into template
print(certificate.fields) # view fields on certificate object
certificate.generate() # generate certificate file and save
certificate.openImg() # open generated certificate file
```
##### Output:
```
src/certificate_template_1.png
Draco Malfoy
Certificate-Draco-Malfoy.png
src/Merriweather-Bold.ttf 42
635
['src/certificate_template_1.png', 'Draco Malfoy', 'Certificate-Draco-Malfoy.png', 'src/Merriweather-Bold.ttf', 42, 635]
```

## Certificates class
##### Create a certificates object with fields that provide information such as:
* the templateFile (certificate img) to be used
* the namesFile (names list - in .xlsx/ .csv/ .tsv/ .json) to be used 
* file_has_header (if names list has header)
* filenames, filepaths
##### With methods:
* generate(destination=defaultsToCurrentDirectory) - generates certificate and saves (destination defaults to current dir)
* openImgs(appPath=pathnameForAppToUse) - opens all generated certificate (appPath defaults to mspaint.exe)
* closeImgs() - closes all generated certificate
##### Sample:
```python
from certificate_gen import Certificates
certificates = Certificates('src/certificate_template_1.png', 'src/names_1.xlsx')  # create a Certificates object
print(certificates.filenames)
certificates.generate() # generate all certificates and save
certificates.openImgs() # open all certificates
from time import sleep
sleep(20)
certificates.closeImgs() # close all certificates
```
##### Output:
```
['Certificate-Names.png', 'Certificate-Himejima-Gyoumei.png', 'Certificate-Iguro-Obanai.png', 'Certificate-Mitsuri-Kanroji.png', 'Certificate-Tomioka-Giyuu.png', 'Certificate-Shinobu-Kocho.png', 'Certificate-Shinazugawa-Sanemi.png', 'Certificate-Kyojuro-Rengoku.png', 'Certificate-Tengen-Uzui.png', 'Certificate-Muichiro-Tokito.png']
```
