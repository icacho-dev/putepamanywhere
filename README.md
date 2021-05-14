# putepamanywhere

## Dev Notes

After Analysis, we have separated the POC in 3 main steps:

1. Upload picture
2. Select a location
3. Picture (must have an EPAM logo watermark)

## TODO

WIP

### Step 1: Upload picture

Backend  requirements

1. User should be able to upload a picture
    - Validations: 
       - allow only common `image/*` formats
       - max size
    - create endpoints:
      - POST /pictures    < where the user image will be uploaded 
      - GET  /pictures    > list all images
      - GET  /pictures:id > fetch single image
    - create a router
   
Frontend requirements:

1. User should be able to upload a picture

---

src
│   app.js          # App entry point
└───api             # Express route controllers for all the endpoints of the app
└───config          # Environment variables and configuration related stuff
└───jobs            # Jobs definitions for agenda.js
└───loaders         # Split the startup process into modules
└───models          # Database models
└───services        # All the business logic is here
└───subscribers     # Event handlers for async task
└───types           # Type declaration files (d.ts) for Typescript
