<h1>Magic Tasks</h1>
<p>Magical tasks from Asana, in your Inbox :)</p>

<h3>Steps to install:</h3>
<p>As there is no "Login with Asana" yet, you'll need to change 2 values in the code to setup for your Asana account.</p>

<h5>1. Download the repo</h5>
<p>Fairly straightforward. Install the code from this repo locally. The chrome extension is not published to the chrome app store.</p>

<h5>2. Open the taskService.js file to edit</h5>	
<ul>
	<li>Open taskService.js. magictask/extension/src/inject/app/taskService.js</li>
	<li>Find lines 5 & 7 with the workspace number and personal access token</li>
</ul>

<h5>3. Find your Workspace number</h5>
<p>I used this Asana API explorer to find the IDs for each of my workspaces.</p>
<a href="https://asana.com/developers/api-reference/workspaces#">https://asana.com/developers/api-reference/workspaces#</a>
<p>Currently, MagicTask can only find tasks from one workspace.</p>
<p>You can select "GET /workspaces" to pull all workspaces for your user account.</p>
<p>Copy/paste the ID number for the workspace you want as the workspace value on line 5 in taskService.js</p>

<h5>4. Find your personal Authorization Token</h5>
<ul>
	<li>Log into the Asana Web App</li>
	<li>Top right click on your workspace and go to "My Profile Settings"</li>
	<li>Click "Apps" then "Manage Developer Apps" at the bottom</li>
	<li>Click "Create a New Personal Access Token"</li>
	<li>Copy the token immediately (you can't find it again later)</li>
	<li>Paste on line 7 in the taskService.js file</li>
</ul>

<h5>5. Save the file and Install Extension</h5>
<p>You can go to your Chrome extensions settings and drag the "extension" folder onto the page to install</p>
<p>Then refresh inbox and you'll see the Magic Task box in the bottom left.</p>



<h4>How it Works</h4>
<ul>
	<li>Extension creates a window in the bottom left of your Inbox by Gmail page on your web app</li>
	<li>It pulls only tasks that are assigned to you and exist within that workspace you selected</li>
	<li>It also only pulls tasks that HAVE a due date</li>
	<li>You can create new tasks (automatically assigned to you) along with a due date with normal language input</li>
</ul>









