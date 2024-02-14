# Using Plop for Rapid Prototyping
Plop is a scaffolding tool used to build out a file structure that would
otherwise take a lot of your time just creating files at the right location
with the right naming conventions.

Manually doing so would likely lead to an inconsistent file structure and file
naming conventions...and that is just the start.

Here at Agrippa.io, we have setup a number of generators to get you going 
quickly.

The `node-generator` assists in creating, naming and placing the appropriate
files into the project. They are also used to dynamically generate your 
routes using `snake-case`.

The power of Plop doesn't stop there. When the generators execute after all 
prompts in the CLI have been completed, Plop reads from a series of configuration 
files to create the appropriate files at the right path with the right name. Plop 
references each configurition and selects a registered template to use for the 
generating the contents of the file.

`Plop Templates` are just `handlebar (.hbs)` files. These templates are passed the
values provided from the series of CLI Prompts and plug them into the templates 
to dynamically create the content of the `output file`.

This allows us to not only build out a lot of the boilerplate code, but also 
create the minimal implementation of almost all the files you will need to 
create basic CRUD operations.

Our Plop generators can do most of the work to get full CRUD Operations 
wired up and functioning, but there are things it cannot do.

Plop cannot write your models for you. Here comes your magnificant skills as a 
Developer. Unleash your awesomeness!

## Generator ExpressRest
Creates end-to-end RESTful CRUD Operations for a Model

Let's get started by using Plop to generate a Model and all of its REST endpoints.

In your CLI, navigate to the root of the project directory you are working 
on and follow the steps below to create our example model `Plan`:

```
# Run Plop
npm run generate

# Select the `ExpressRest` generator and hit enter
> ExpressRest

# Enter the model name in PascalCase
> Plan

# Watch the magic of Plops create a series of files. Take note that Test files are 
# also scaffolded :)
```

All of the routes for CRUD operations will be generated, HOWEVER, they 
commented out by default to prevent you from exposing an endpoint before it 
is production ready.

YOU MUST MANUALLY REGISTER THE MODEL ROUTER (`src/routes/v1/<model-name>`) 
INTO 
THE VERSION ROUTER FILE (`/src/routes/v1/index.ts`)

### `/src/routes/v1/index.ts`
```
// vvv IMPORT OUR NEW PLAN ROUTER vvv
import PlanRouter from './Plan'


// Authenticated Routes - Models
// vvv REGISTER OUR PLAN ROUTES WITH THE V1 ROUTER TO ACTIVATE ROUTES vvv
RouterV3Models.use('/plans', PlanRouter)

// Leave the folling alone as it registers middleware used for Authentication
// Register v<N> Routes
const RouterV<N> = express.Router()
RouterV1.use('/v1/health', VigorHealthChecker)
RouterV1.use('/v1/auth', AuthenticationRouter)
RouterV1.use(
  '/v1',
  AuthenticateUser,
  RejectUnauthorizeRequest,
  RouterV1Models,
  CatchAllErrors
)

export default RouterV1
```

Once you have attached the Model Router to the Root Version Router, you can actually
start using the CRUD endpoints as the schema is created with a single property
`name` of type `string` so that you can immediately test that things are wired up.

Try hitting the following endpoints using Postman:
 * `POST /v1/plans` - with body { name: 'test' }, Creates a new Plan
 * `GET /v1/plans` - List Plans
 * `PUT /v1/plans/:id` - Update Plan
 * `DELETE /v1/plans/:id` - DELETE Plan
 
NOTE: I have not added the `PATCH` endpoints to ExpressRest yet...maybe give it a shot?

Now that we have tested that our routes work out of the box, we can start implementing
our model-specific logic. Most of this will be done in the appropriate `src/model/<model-name`
directory.

Required File Updates:
 * `/src/constants/model.ts` - Add the new Model Name to the Models Constants file
 * `/src/model/<model-name>/schemaDefinition.js` - Write the Model Schema (By default has `name` prop)
 * `/src/model/<model-name>/interfaces/props.ts` - Declare props a simple POJO Model Object contains
 * `/src/model/<model-name>/interfaces/document.ts` - Declare props MongoDB needs to know
 * `/src/model/<model-name>/serializer.js` - Register the properties that will be returned for Model Requests
 
Optional File Updates:
 * `/src/model/<model-name>/interfaces/model.ts` - Declare custom methods created for Mongoose Model
 * `/src/model/<model-name>/private.js` - Add custom public methods attached to Mongoose Model
 * `/src/model/<model-name>/private.js` - Add custom private methods attached to Mongoose Model

Leverage the Power-User Features of Mongoose:
 * `/src/model/<model-name>/middleware/<custom-middleware>.js` - Add custom Mongoose Middleware
 * `/src/model/<model-name>/quries/<custom-query>.js` - Add custom Mongoose 
   Query Methods
 * `/src/model/<model-name>/validators/<validator-name>.js` - Add custom Mongoose Validators
 * `/src/model/<model-name>/quries/<query-name>.js` - Add custom Mongoose Query Methods
 * `/src/model/<model-name>/virtuals/<virtual-name>.js` - Add Mongoose Model Virtual Methods

