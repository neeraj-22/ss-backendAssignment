# Node-DB Proxy 

#### <a href="https://neeraj-22.notion.site/Samespace-Backend-Assignment-58d3516157724a8a909c5abc80b19902?pvs=4" target="_blank">🔗 Case Study </a> : Node JS app with endpoints to ingest schema on server statup and CRUD ops on a SQL database.

<hr/>

## Problem Statment
Build a generic database proxy - a REST API for CRUD on a SQL database.

<h3>Constraints</h3>
We don’t know what the schema looks like, so the DB proxy should ingest schema files and build the DB schema based on that on every server startup.

## About the Project
The nodejs project checks on the every requirement and is based on the MVC architecture and takes care of the error handling 
<p><i><b>
  MVC Architecture
</b></i></p>

<img width="1282" alt="Screenshot 2023-09-20 at 07 07 07" src="https://github.com/neeraj-22/node-timestamps/assets/64327599/ed5198bf-6886-4ef8-bc4b-cb50648f1c59">

<hr/>

<p><i><b>Routes as defined</b></i></p>


<img width="1108" alt="Screenshot 2023-09-20 at 07 19 31" src="https://github.com/neeraj-22/node-timestamps/assets/64327599/0ca79263-e2e9-411d-b71c-3fe35cc8b7e0">

<br/>

<p><b>Checklist</b></p>

| Technical Requirements | Implemented in Submission  |
| :---:   |  :---: |
| CRUD on defined routes |   ✅    |
| Check for existence of tables |   ✅   |  
| Local SQL instance |   ✅   |  
| Based on Nodejs |   ✅   |
| Bonus : Automated testing |   ❌   |

<br/>

## Room for improvement
> The application is up and working but there’s always a headroom for improvement. Further this could be improved by :
1. Handling better ingestion of schemas — providing users with more flexibility in the json structure.
2. Application could be made better for concurrent environments by emphasising more on connection pooling, writing asynchronous functions and focussing on bringing more modularity for tasks to stay parallel.
