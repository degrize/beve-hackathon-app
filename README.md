# beveApp

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

```
npm install
```


Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```
./mvnw
npm start
```

### PWA Support

The service worker initialization code is disabled by default. To enable it, uncomment the following code in `src/main/webapp/app/app.module.ts`:

```typescript
ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
```

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

```
npm install --save --save-exact leaflet
```

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

```
npm install --save-dev --save-exact @types/leaflet
```

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Edit [src/main/webapp/app/app.module.ts](src/main/webapp/app/app.module.ts) file:

```
import 'leaflet/dist/leaflet.js';
```

Edit [src/main/webapp/content/scss/vendor.scss](src/main/webapp/content/scss/vendor.scss) file:

```
@import '~leaflet/dist/leaflet.css';
```

### JHipster Control Center

JHipster Control Center can help you manage and control your application(s). You can start a local control center server (accessible on http://localhost:7419) with:

```
docker-compose -f src/main/docker/jhipster-control-center.yml up
```

## Building for production

### Packaging as jar

To build the final jar and optimize the beveApp application for production, run:

```
./mvnw -Pprod clean verify
```

Then navigate to [http://localhost:9004](http://localhost:9004) in your browser.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./mvnw -Pprod,war clean verify
```

## Testing

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

```
npm test
```

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Note: we have turned off authentication in [src/main/docker/sonar.yml](src/main/docker/sonar.yml) for out of the box experience while trying out SonarQube, for real use cases turn it back on.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar
```

## Using Docker to simplify development (optional)

```
docker-compose -f src/main/docker/postgresql.yml up -d
```

To stop it and remove the container, run:

```
docker-compose -f src/main/docker/postgresql.yml down
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
npm run java:docker
```

Or build a arm64 docker image when using an arm64 processor os like MacOS with M1 processor family running:

```
npm run java:docker:arm64
```

Then run:

```
docker-compose -f src/main/docker/app.yml up -d

```

# Mes bibliotheques

```
npm i --save-dev @types/chart.js

```

# le boton spprimer

Ajouter ce code dans content/asset/scss/customer/\_variables.scss

```
//Modal z-index
$zindex-modal-backdrop: 1500;
$zindex-modal: 1500;
```

# Mes Requetes

pour la relation entre le createur africain et son compte utilisateur Beve

```
alter table "public".createur_africain
    add photo bytea,
    add photo_content_type character varying(255),
    add jhi_user_id bigint,
    add CONSTRAINT fk_createur_africain__jhi_user_id FOREIGN KEY (jhi_user_id)
        REFERENCES jhi_user (id) MATCH SIMPLE
            ON UPDATE NO ACTION ON DELETE NO ACTION
```

```
alter table "public".createur_africain
add etat_compte varchar(255)
```

Add colonne Montant to Don

```
alter table "public".don
add montant double precision;
```

Pour la table aide

```
CREATE TABLE aide
(
    id bigint NOT NULL,
    nom character varying(255) NOT NULL,
    message character varying(255),
    email character varying(255),
    CONSTRAINT aide_pkey PRIMARY KEY (id)
)
WITH (
    OIDS=FALSE
);
ALTER TABLE aide
OWNER TO postgres;
COMMENT ON TABLE aide
IS E'Don entity.\\n@author BEVE.';
```
