# Mapping Skills Prototype (Angular)

One of the challenges teams face is the evidence of who-knows-what and who-can-teach others.
In many teams in the enterprise environment this is done through specialized software following a strict
process, on the other hands small startup teams usually don't even know where and how to start.

After spending several years via trial/error/feedback I've came back to what is the core of the well
established "Toyota talent" method backed by a simplified skill-matrix that fulfills the base goals:
- supports team autonomy and engagement (they are in power)
- supports conversation on what skills are needed and if what we have is enough
- helps in managing risks due to overspecialization or members leaving team
- promotes community learning

The app is free to use online at [Mapping Skills Prototype UI](https://jankudev-work.github.io/mapping-skills-prototype-ui/).

## How to start
### Phase 1) Identify skills
The basic principle is that each team defines in a simple table its members and skills. And this is
completely up to the team, this initial session helps to create a common understanding in the team.
![alt Identify skills in skill matrix and define team](https://raw.githubusercontent.com/jankudev-work/mapping-skills-prototype-ui/24b3662347142c2ae54e8f792ab7b4cd979186ed/docs/empty-matrix-initial-mapping.png "Identify skills in skill matrix and define team")

In order to add a team member or a new skill simply use the "Add" buttons on the bottom left (blue) and fill the the required
name in the dialog box - confirm.
![alt Add new team member](https://raw.githubusercontent.com/jankudev-work/mapping-skills-prototype-ui/24b3662347142c2ae54e8f792ab7b4cd979186ed/docs/add-member.png "Add new team member")
![alt Add new skill](https://raw.githubusercontent.com/jankudev-work/mapping-skills-prototype-ui/24b3662347142c2ae54e8f792ab7b4cd979186ed/docs/add-skill.png "Add new skill")

In order not to loose your work you have to possibility to store your skill matrix into the local storage
of your browser using the "Save" button on the right (pink). Why into the local storage of the browser?
This micro application does not share any data with anyone so everything you do is strictly located to your local
browser / endpoint. In case you'd like to to persist everything into a database feel free to create a fork
or implement a storage adapter. To restore the last saved version simply press ```F5``` (browser refresh).

In order to move your skill matrix between computers, perform a backup, etc. there is the possibility to
export everything in JSON (not a nice file, but it works) and later import it on another computer. Even
direct manipulation with the JSON is possible but it's just a simple serialization/deserialization so
don't expect any checks or heuristics.

Ok, you've got your matrix ready and now you can have it on a screen in your office instead of a board with
stickers. What next?

### Phase 2) Assessment, ee. filling up the thing
In order to map the skills of your team after creating a common understanding you can click on any
cell in the matrix and select the appropriate skill level. The current level is highlighted as well as
the name of the skill and the team member so you need not to keep that in mind. Just select the appropriate
skill and voila.
![alt Assess the right skill level](https://raw.githubusercontent.com/jankudev-work/mapping-skills-prototype-ui/24b3662347142c2ae54e8f792ab7b4cd979186ed/docs/change-skill-level.png "Assess the right skill level")

And there you go, you can simply fill each team members skill level and act based on the information you have
aggregated in a clear and conscice way.

Also don't forget to save your changes :-) (autosave was in mind but for convenience purposes experimentation
has shown it's not really required, on the contrary)

### Phase 3) Working with the matrix
You can later add/remove skills and team members as it's required. But the main purpose is to play with it and
use it for some scenario discussions.
![alt Working with skill matrix](https://raw.githubusercontent.com/jankudev-work/mapping-skills-prototype-ui/24b3662347142c2ae54e8f792ab7b4cd979186ed/docs/main-skill-matrix-example.png "Working with skill matrix")

Do we have enough people with the new emerging skill in our team?
Who can teach a team member a required skill?
Who should be capable to perform a quality review check on?
How are our junior team members progressing? Do they know whom to ask (or are they asking the right people)?
What will happen if somene leaves the team (how screwed are we going to be)?

Possibilities are wide and it's up to you creativity. The main thing is start, keep doing it and find all
the places this simple approach can help you.

## Some technical information
### Angular SPA
This whole project is a simple Angular application created using Angular CLI and based on the Angular Material
compoonents. It's not a piece of beaty since I've not programmed in a while but hey - it works and provides value.
Also it's simple enough to change anyway you want - for me this is KISS principle implemented (and don't hate me for that).

Also it's not responsive, there might be some graphical quirks since the graphics is made purely by CSS just
because I thought it has to be possible, etc. If you want to improve, open a pull-request :-)

Also no tests, there's like literally almost nothing to test since to run it takes 1s and to test any
feature takes another 1s.

### Usage rights / restrictions
This is usable by anyone. As mentioned earlier it shares no data with any server so all you need to do is deploy
the application or even better, just open in on the hosted page https://jankudev-work.github.io/mapping-skills-prototype-ui/
and just go! No install, no extensive configuration, no nothing.

### Deploy to gh-pages
One cool thing I didn't know is that you can use github pages to host a static website which is ideal
for this case. And it's all one-click (ok, one-command) ahead using the https://www.npmjs.com/package/angular-cli-ghpages tool.

```
ng deploy
--repo=https://github.com/[organization]/[repo].git
--name="[username]" --email="[email]"
--base-href="[repo]"
```

###  Sonar
I'd be dumb if I would not use any code quality control since I'm not regularly programming and Sonar has been
my SAST tool to go for quite some time.
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jankudev-work_mapping-skills-prototype-ui&metric=alert_status)](https://sonarcloud.io/dashboard?id=jankudev-work_mapping-skills-prototype-ui)
