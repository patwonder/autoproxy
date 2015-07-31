set XPI_NAME=autoproxy.xpi
cd ..
del /f/q %XPI_NAME%
tools\7za a %XPI_NAME% chrome\
tools\7za a %XPI_NAME% defaults\
tools\7za a %XPI_NAME% components\
tools\7za a %XPI_NAME% chrome.manifest
tools\7za a %XPI_NAME% install.rdf
tools\7za a %XPI_NAME% icon.png
