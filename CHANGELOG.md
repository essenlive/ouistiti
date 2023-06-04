# Change Log

All notable changes to this project will be documented in this file
automatically by Versionist. DO NOT EDIT THIS FILE MANUALLY!
This project adheres to [Semantic Versioning](http://semver.org/).

# v2.4.0
## (2022-06-13)

* Fixes node-red block [Alex]

# v2.3.1
## (2021-10-22)

* make sure ssh workflow 4 projects works [curcuz]

# v2.3.0
## (2021-10-22)

* remove deprecated password hashing instructions [curcuz]

# v2.2.4
## (2021-05-21)

* contract update [Phil Wilson]

# v2.2.3
## (2021-03-12)

* Update the balena.yml file to conform to current `balena push` requirement. [Pranav Peshwe]

# v2.2.2
## (2020-12-31)

* Use svg deploy with balena button [Amit Solanki]

# v2.2.1
## (2020-09-14)

* add Dockerfile for rpi4 [Juan Fernandez Ridano]

# v2.2.0
## (2020-09-14)

* Add a DWB button [Stevche Radevski]

# v2.1.1
## (2020-02-24)

* Dockerfile: Add missing libatomic1 dependency [Heds Simons]

# v2.1.0
## (2019-09-13)

* add correct deps, devices and caps [curcuz]

# v2.0.0
## (2019-09-13)

* make sure node-red can talk with the supervisor [curcuz]
* refactor to multicontainer and balena assets [curcuz]
* Regenerate changelog file with previous commits [Giovanni Garufi]
* Add versioning information and repo.yml [Gergely Imreh]

# v1.0.0
## (2019-09-13)

* switch to balenalib base image and node 10 [Gergely Imreh]
* Fix link to node-red-contrib-balena repo [skip ci] [Misha Brukman]
* URL correction [Chris Crocker-White]
* Rename process [Chris Crocker-White]
* disable initsystem [curcuz]
* pin the LTS nodeJS tag [Carlo Maria Curinga]
* sitch to alpine slim and do magic for build-essential [curcuz]
* Reword section on environment variables for additional clarity. [Lucian Buzzo]
* Precisions about the need to fill some env vars [Tristan ROBET]
* always use latest LTS node release [curcuz]
* move playground links to projects [Carlo Maria Curinga]
* shrink image [Carlo Maria Curinga]
* removed useless comma [Carlo Maria Curinga]
* use a less device type specific base image [Carlo Maria Curinga]
* initial release [Carlo Maria Curinga]