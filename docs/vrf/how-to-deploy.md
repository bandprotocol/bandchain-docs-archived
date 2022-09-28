# How to deploy and run VRF Worker

### What is VRF Worker

VRF Worker is an off-chain service used for relaying VRF random value requests and results between the BandChain and the target chain (e.g. Ethereum). It works as follows:

1.  The VRF Worker listens for incoming VRF random value requests from a VRF Contract on the target chain
2.  The VRF Worker relays these requests to BandChain, and retrieves the generated VRF random values and the BandChain Merkle proofs
3.  The proofs get relayed to the Bridge Contract, via the VRF Contract, for verification
4.  If the proofs are verified successfully, the VRF Worker returns the generated VRF random values back to the VRF contract

## Deployment

We provide scripts and instructions for local deployment and deployment on Google Cloud Platform. Note that the deployment procedures are currently only avaiable in Python.

### Folder structure

The VRF Worker files are located in `vrf_worker` folder.

| Files | Details |
| ----- | ------- |
| `app.py` | Main entry point of the service |
| `database.py` | Helper to manage database interaction |
| `signatures.py`  | Helper to manage signature filtering |
| `create_task.py` | Script to create a new task on Cloud Tasks |
| `config.py` | Helper to manage environment variables configuration |
| `deploy.sh`  | Deploy script for Cloud Run |
| `Dockerfile`  | For preparing a Docker image to be used in `deploy.sh` |
| `.env.template` | For local deployment |
| `requirement.txt` | Python dependencies |

---

### Deploy on local machine

1.  Install dependencies from `requirements.txt`
2.  Create a `.env` file from `.env.template` and update required environmental variables
3.  Setup a database. To connect to the database, please update `SQLALCHEMY_DATABASE_URI` in `config.py`
4.  Run `python3 app.py` to start the service. Note that the service will continue running until an error is encountered or manually interupted

---

### Deploy on Google Cloud Platform

**Tools used:** Cloud SQL, Cloud Tasks, Cloud Run

1.  Setup Cloud SQL
    -   Create a Cloud SQL instance (using PostgreSQL) with Private IP. Refer to this [guide](https://cloud.google.com/sql/docs/postgres/configure-private-ip).
    -   Create a new database inside the Cloud SQL instance
2.  Setup Cloud Tasks
    -   Create a push queue on Cloud tasks. Refer to this [guide](https://cloud.google.com/tasks/docs/creating-queues)
    -   Set `Max concurrent dispatches` to 1
    -   Set `Max attempts` to 1
3.  Prepare script for deploying the service
    -   Open `vrf_worker` folder
    -   Install dependencies from `requirements.txt`
    -   In `deploy.sh` file, fill out all environment variables (refer to `deploy.sh.example` and `.env.template` for examples). Note that some variables such as `CLOUD_RUN_URL` and `AUDIENCE` may not be known prior to the first deploymen. These variables can be manually added in the Cloud Run service after deployment
4.  Deploy the service on Cloud Run
    -   Run `./deploy.sh` to build a Docker image and deploy the service on Cloud Run. If a prompt to setup `gcloud auth login` appears, please follow the instruction
    -   Once deployed successfully, create and reference the following secrets on Cloud Run:
        
        ```
        WORKER_PK
        BAND_MNEMONIC
        DB_PASSWORD
        ```
        
    -   Fill in any remaining environment variables (e.g. `CLOUD_RUN_URL` and `AUDIENCE`)
5.  Create initial task on Cloud Tasks
    -   Fill out all environment variables `.env`
    -   Run `python3 create_task.py` to create a new task in the Cloud Tasks queue
    -   After the current task is finished, a new task will be created automatically by the service
    -   The service will now continuously until the Cloud Tasks queue is paused or deleted
    -   If there is an error in the automatic task creation by the service, you may run `python3 create_task.py` to create a new task in the Cloud Tasks queue again.
