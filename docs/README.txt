
prod: 
	turfr.svur.dev

testing: 
	beta.turfr.svur.dev

---

1. What problem exactly are we solving? 
	We're solving the pain point of tracking players to 
	- avoid countless follow ups for payments 
	- identify defaulters 
	- ensure smooth organizing
	- avoid miscommunication

2. Who are the users? 
	The users are Ulwe Footballers 
		- Users: who play turf football
		- Organizers: who organize games
		
3. What actions can they perform? 
		Organizers
			- Can organize games
			- Can kick out anonymous/unidentified players 
			- Confirm payment recieved
		
		Users 
			- users can add their name
			- pay to reserve their position in order to book the turf officially
		
4. What data must the system store? 
		- Match details 
		- Defaulters
		- Games concluded
		- cool Player stats for revealing how much they played, spent, etc.  
		I think that's enough
		
5. What edge cases exist? 
	- Downtime: When in downtime, organizer tracks manually/or offline until server is up. 
	- Overbooking Problem: When two players are trying to book it together. Use logic to accept one. 
	- Organizer can delete games, games once booked cannot be deleted, we soft delete during deletions, and maintain states to ensure how it ended


---

1. Create match: 
	POST /match 
2. Get match info: 
	GET  /match/{id}
3. Join match: 
	POST /match/{id}/join
4. Mark paid:  
	POST /match/{id}/paid 
5. Remove player: 
	DELETE /match/{id}/player/{player_id}
	
---
	

Create match -> Share link -> Monitor payments

Open link -> Google login -> Join -> Pay UPI -> Mark Paid
	
System flow: 
1. Track slots
2. Track payment status 
3. Prevent overbooking 


System Risk: 
1. Overbooking: 
	Problmem: Last two players joining the slot. 
	Solution: Database constraint + transaction. 
	
2. Duplicate Joins:
	unique(match_id, player_id) 
	
3. Fake payements: 
	Organizer confirmation
	
4. Sharing outside group: 
	Organizer can remove players. 
   
5. Slow loading
	Use server-side rendering in Next.js so that match page loads instantly. 
	




Next.js

UI 
APIs 


Browser -> React Frontend (static hosting) -> Backend Server (Node / Spring Boot) -> Database

Now DevOps problems appear when

You must manage 
- Frontend hosting 
- Backend server 
- Server scaling 
- Environment variable 
- Routing between frontend and backend 
- API gateway/reverse proxy 
- SSL Certificates


Nginx 
Node Server 
Docker 
AWS EC2
CI/CD pipeline 


Browser -> 
React Frontend (static hosting) -> 
Backend Server (Node / Spring Boot) -> 
Database


Next.js Architecture 

Browswer -> 
Next.js (frontend + backend) -> 
Database 


checklist

done: 
	- basic project cleanup
	- add Supabase client
	- create db schema
	- match creation
	- join match logic

pending: 
	- google auth
	- match page (core UI)
	- payment button (UPI deep link)
	- mark paid by organizer

chore(repo): initialize turfr-list Next.js project and add README
chore(app): remove default Next.js boilerplate
feat(infra): configure Supabase client
feat(db): add initial schema
feat(auth): implement Google login
feat(match): implement match creation flow
feat(match): add dynamic match page
feat(player): allow users to join match
feat(payment): add UPI payment link
feat(payment): add payment confirmation


Features

1. Create Match

2. Join Match

    Open match link -> Click Join -> Enter name -> Player appears in list

    -> Player enters name
    -> Server checks match capacity
    -> if slot available, status = active
        else, status = waitlist
    -> player inserted into participation
    -> match page reloads
    -> players shown in Playing / Waitlist sections



3. Waitlist

    waitlist position is derived state.


Versions

v1.0 (current)
    name-based identity
    localStorage
    fast join

v1.5
    prevent duplicate names
    highlight your name
    show waitlist position
    team generation

Future improvements v2.0, not for beta v1.0

    Race condition handling
    Use Postgres transaction later.

    Realtime updates
    Supabase realtime / polling.

    Authentication
    Google login.
    User accounts.
    True identity.
    Payment tied to user.

    Notifications

    Reliability scoring
    Soft signals only.