
# Paw Party App

BFFE in Next.JS, other supporting docs in progress.

## Setting up
First make sure you have Node.js 18.18.0 or later installed if not you can see go to https://nodejs.org/en

Now install pnpm globally if you have not already by running this in your terminal\
```npm install -g pnpm```

<br/><br/>
Next clone the repo onto your local machine by running\
```git clone https://github.com/estevanio/pawparty-app.git``` and then cd into the project ```cd pawparty-app```

<br/><br/>
To install the projects packages run\
```pnpm i```

<br/><br/>
and then to boot up the servier run\
```pnpm dev``` 

<br/><br/>
at this point you should be able to go to ```http://localhost:3000/``` and view the homepage 


<img width="1276" alt="Screenshot 2024-10-28 at 2 05 36 PM" src="https://github.com/user-attachments/assets/69b3378b-3cde-4070-a322-d44fd2538340">



## Setting up your database

This app uses prisma so to get started lets download it with the following line\
```pnpm install @prisma/client```
<br/><br/>

In order to connect to the db you will need to get some enviornment variables and put them in a ```.env``` file on your machine. Reach out to Estevan for those. Once you have put them in an env file you will probably want to restart your server. 
<br/><br/>

then migrate your local db\
```pnpm prisma migrate dev```
<br/><br/>

If this fails try running\
```pnpm prisma generate```
<br/><br/>

At this point the app shold be up and running.




