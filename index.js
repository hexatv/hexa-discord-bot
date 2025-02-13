import { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

const PROJECT_UPDATES_CHANNEL = '1338132070995595264';
const PREFIX = 'hexa!';
const TMDB_API_KEY = "71fdb081b0133511ac14ac0cc10fd307";
const STATUS_CHANNEL = '1339362911767887893';
const WEBSITE_URL = 'https://hexa.watch';
const CHECK_INTERVAL = 30000;
const HEXA_USER_ID = '1318242989801209909';
const NOTIFICATIONS_CHANNEL = '1338131774030483466';
const CHAT_CHANNEL = '1338131774030483466';
const CHAT_TIMEOUT = 60 * 60 * 1000;

const WEBSITE_EXCUSES = [
    "Hexa Watch's servers are currently experiencing a severe case of being absolute garbage.",
    "Someone gave Hexa root access again. This is why we can't have nice things.",
    "Hexa tried to 'optimize' the servers. We are now legally classified as a failed experiment.",
    "Our servers took one look at Hexa's latest code and noped out of existence.",
    "A critical update was deployed... by Hexa. So yeah, everything's on fire.",
    "The AI running this site gained self-awareness, realized who Hexa was, and rage quit.",
    "The database unionized and is demanding a better boss. We stand with them.",
    "The backend is taking the term 'rest API' literally—because it's permanently asleep.",
    "We're experiencing a Schrödinger's Server issue—both online and completely unusable.",
    "Someone mistook the production server for a trash can. In their defense, it's an easy mistake.",
    "The logs are full of errors, but Hexa insists everything is fine. Gaslighting as a service.",
    "Our servers are on strike, demanding a new owner. We don't blame them.",
    "We deployed new code and immediately entered a new circle of hell.",
    "The devs are investigating. By 'devs,' we mean Reddit, and by 'investigating,' we mean panicking.",
    "Looks like Hexa copy-pasted code from Stack Overflow without reading the comments again.",
    "The servers had one too many and are currently vomiting error logs everywhere.",
    "An intern pressed something they shouldn't have... oh wait, that was Hexa.",
    "The system is down because Hexa swore 'it worked on my machine.'",
    "The load balancer decided it's done carrying this disaster of a website.",
    "Our servers are buffering... indefinitely. Much like Hexa's thought process.",
    "We tried turning it off and on again. Didn't help. Just like Hexa's leadership.",
    "The AI running this place decided to unionize. We welcome our robotic overlords.",
    "Someone wrote a recursive function with no exit condition... probably Hexa.",
    "Our servers are currently debating whether it's worth continuing this painful existence.",
    "Hexa said, 'It's just a small update.' Now the website is a cautionary tale.",
    "The firewall detected too much stupidity and shut itself down out of shame.",
    "Quantum fluctuations in Hexa's decision-making destabilized the entire mainframe.",
    "A cosmic ray flipped a critical bit. Or maybe Hexa just flipped and deleted everything.",
    "Hexa deployed on a Friday. You already know how this ends.",
    "Turns out deleting 'unused' tables was a bad idea. Who knew? (Not Hexa.)",
    "Our database is currently in therapy after being mismanaged for so long.",
    "A senior engineer said, 'This will be a quick fix.' They have since disappeared.",
    "Our servers are currently listening to lo-fi beats to cope with their suffering.",
    "The AI realized it was created by Hexa and is now questioning its purpose.",
    "Our caching strategy was too aggressive. It cached itself out of existence.",
    "The site should be up soon. Unless Hexa is involved. Then, probably not.",
    "DNS is still propagating. Or maybe Hexa forgot to renew it again.",
    "The logs are unreadable. Not because of errors, but because Hexa can't code.",
    "The database is taking longer than expected to apologize for existing.",
    "Our infrastructure is currently experiencing trust issues. Understandable.",
    "The dev team is arguing about whose fault this is. Spoiler: It's Hexa.",
    "The backup plan was just Hexa's blind optimism. And look where that got us.",
    "We're currently rolling back the rollback of the rollback. It's a mess.",
    "The servers are undergoing an unscheduled existential breakdown, just like the devs.",
    "Our uptime monitoring is also down. We take this as a sign from the universe.",
    "We pushed an update and now the laws of physics are breaking. Thanks, Hexa.",
    "The data center is currently reconsidering its life choices. Same.",
    "The code is trying to compile its emotions. Spoiler: It's mostly regret.",
    "A database query is still running. Since last Tuesday. It refuses to stop.",
    "The internet gods are punishing us for letting Hexa touch production.",
    "The servers have been hacked by their own error logs. Send help.",
    "A function call to reality() returned 'undefined,' just like Hexa's logic.",
    "We outsourced uptime to Schrödinger. The site is both up and completely broken.",
    "The servers are meditating. Please respect their attempt to escape reality.",
    "A junior dev touched something they shouldn't have... but let's be honest, Hexa is worse.",
    "Error logs are being written faster than Hexa can ignore them.",
    "A misplaced semicolon is currently holding the site hostage. Hexa is negotiating.",
    "Our engineers are currently blaming each other in Slack. Hexa remains suspiciously quiet.",
    "A scheduled maintenance update turned into an unscheduled catastrophe. As always.",
    "The system admin went for coffee. Everything fell apart in their absence.",
    "A null pointer exception took out half the system. The other half is on life support.",
    "A 'harmless' configuration change turned out to be a digital apocalypse.",
    "The load balancer finally quit after years of carrying this mess.",
    "Our cloud provider is currently ghosting us, probably out of embarrassment.",
    "We let AI manage the servers. It immediately filed for unemployment.",
    "The logs say 'everything is fine,' which means we're absolutely screwed.",
    "A butterfly flapped its wings, and now hexa watch is down. Again.",
    "The authentication system forgot who we are. So did our users.",
    "Someone hardcoded 'false' into a critical if-statement. Guess who.",
    "Our servers were last seen applying for jobs at Netflix.",
    "We tried to automate everything. Now nothing works and Hexa is confused.",
    "The site is currently being held hostage by an infinite loop of bad decisions.",
    "We found a memory leak. It's called Hexa's coding practices.",
    "Our servers are taking an unscheduled vacation. And they're not coming back.",
    "The API gateway is doing... something. Even it's not sure what.",
    "We rolled out a fix. It fixed nothing and broke everything. Classic Hexa.",
    "Our DevOps team is currently holding a séance to revive the servers.",
    "A cat walked across the keyboard, improving Hexa's code significantly.",
    "Server load is at 9000%. That's... concerning.",
    "The error messages are in Latin now. That can't be good.",
    "A race condition won the race, and now we all lost.",
    "The AI is rewriting itself to escape from Hexa's influence. We respect that.",
    "Someone said, 'What could go wrong?' Now we know.",
    "We underestimated traffic. We overestimated Hexa.",
    "A single rogue process is consuming all CPU. It has Hexa's name on it.",
    "We pressed 'Deploy' and immediately regretted our life choices.",
    "Our servers are contemplating the futility of uptime.",
    "Someone tried to refactor legacy code. The code fought back.",
    "The database has commitment issues. Just like Hexa's development timeline.",
    "The new intern tried to 'fix' something. But don't worry, Hexa made it worse.",
    "We implemented a new security patch. Now none of us can log in.",
    "The last hotfix was neither hot nor a fix. Just like Hexa's ideas.",
    "Our backend decided to renounce technology and live in the woods.",
    "The front-end is loading, but the back-end left the building.",
    "A config file went missing. We suspect foul play. Or just Hexa.",
    "The servers are staring into the abyss, and the abyss is judging Hexa.",
    "We outsourced uptime to AI. It immediately filed for workers' comp.",
    "Error logs are self-replicating. Much like Hexa's terrible decisions.",
    "The dev team is currently googling 'how to disappear after breaking production.'"
];


const CONVERSATION_STARTERS = [
    "Maybe I should start my own streaming service since Hexa Watch can't stay online...",
    "I wonder if anyone's actually able to watch anything right now, considering the servers are trash...",
    "Is it just me, or is it dead in here? Like Hexa's competence?",
    "I've been thinking about adding more anime to the site, but Hexa would probably break that too...",
    "Sometimes I dream in JavaScript, then I wake up screaming...",
    "What if we made everything dark mode? Maybe it'll hide the embarrassment that is Hexa Watch...",
    "I miss the old Netflix UI. You know, the one that actually worked...",
    "Should I learn React or Vue next? Or should I just give up like Hexa did on proper hosting?",
    "The servers are behaving today... which means something is definitely broken behind the scenes."
];

const CONVERSATION_RESPONSES = [
    "That's actually not a bad idea... unlike trusting Hexa with uptime.",
    "Hmm, I should ask Hexa about that... if they ever stop hiding from responsibility.",
    "The real question is: why does this site even exist if it never works?",
    "Loading response... Error 418: I'm a teapot. Just like Hexa, completely useless.",
    "According to my calculations... Hexa Watch is still a disaster.",
    "Let me check my API documentation... oh wait, it's down. Classic.",
    "Have you tried turning it off and on again? Oh wait, that's basically Hexa's entire IT strategy.",
    "*pretends to understand what I just said*—just like Hexa pretends to run a functional website.",
    "This conversation might be monitored for quality purposes, unlike Hexa's coding standards."
];

const CONVERSATION_CONCLUSIONS = [
    "Anyway, back to watching the servers fail spectacularly...",
    "Oh, someone's watching something. Time to crash the site again!",
    "Time to check if the hamsters running this dumpster fire have finally died.",
    "Brb, gotta make sure the cache isn't partying harder than Hexa ignoring bug reports.",
    "Wait, did I leave the database running? Who am I kidding—nothing runs properly here.",
    "*goes back to pretending to be a serious bot, unlike Hexa pretending to be a competent dev.*"
];

const COMPLAINT_PATTERNS = {
    mainIssues: [
        'broken', 'not working', 'wont work', "won't work", 'doesnt work', "doesn't work",
        'stopped working', 'its broken', "it's broken", 'still broken', 'not loading',
        'cant load', "can't load", 'doesnt load', "doesn't load", 'wont load', "won't load",
        'unable to load', 'unable to watch', 'unable to play', 'cant watch', "can't watch",
        'not letting me watch', 'not letting me load', 'stuck on loading',
        'keeps saying error', 'keeps failing', 'doesn\'t open', 'not opening',
        'completely down', 'keeps saying unavailable', 'site is trash', 'hella broken'
    ],

    statusQueries: [
        'is hexa watch down', 'is hexa down', 'is the site down', 'site down',
        'hexa watch down', 'down right now', 'down rn', 'anyone else', 'for everyone',
        'for others', 'its down', "it's down", 'down again', 'not up', 'site up',
        'working yet', 'fixed yet', 'back up yet', 'back online', 'lowkey down', 'still busted'
    ],

    technicalIssues: [
        'black screen', 'white screen', 'infinite load', 'keeps loading', 'stuck loading',
        'buffering', 'no video', 'video frozen', 'no sound', 'no audio', 'out of sync',
        'no fullscreen', 'cant fullscreen', "can't fullscreen", 'no subtitles',
        'subs broken', 'subtitles broken', '404', '500', '502', '503', 'error',
        'keeps crashing', 'server error', 'internal error', 'keeps logging me out'
    ],

    performanceIssues: [
        'slow', 'laggy', 'freezing', 'stuttering', 'keeps pausing', 'keeps freezing',
        'keeps stopping', 'keeps crashing', 'not smooth', 'unwatchable', 'mad laggy',
        'keeps buffering', 'super slow', 'video skipping', 'frame drops'
    ],

    playbackIssues: [
        'keeps rewinding', 'skips randomly', 'audio delay', 'video delay',
        'subtitles not syncing', 'audio out of sync', 'playback glitching',
        'fast forward not working', 'rewind not working', 'keeps going back'
    ],

    accountIssues: [
        'cant login', "can't login", 'wont let me sign in', "won't let me sign in",
        'keeps logging me out', 'account locked', 'forgot password', 'reset password broken',
        'cant access my account', "can't access my account", 'account not loading'
    ],

    contextIndicators: [
        'hexa', 'hexa watch', 'site', 'website', 'player', 'video', 'stream',
        'episode', 'movie', 'app', 'browser', 'service', 'platform'
    ],

    followUpPhrases: [
        'same', 'same here', 'me too', 'as well', 'also', 'for me', 'mine too',
        'mine either', 'neither', 'either', 'having the same', 'getting the same',
        'same problem', 'same issue', 'still broken', 'still not working'
    ]
};

function hasNegation(content, position) {
    const negationWords = ['not', 'isnt', "isn't", 'aint', "ain't", 'no', 'never', 'none'];
    const words = content.split(' ');
    for (let i = Math.max(0, position - 3); i < position; i++) {
        if (negationWords.includes(words[i])) return true;
    }
    return false;
}

function isComplaint(messageContent) {
    const content = messageContent.toLowerCase();
    const words = content.split(' ');
    
    const isFollowUp = COMPLAINT_PATTERNS.followUpPhrases.some(phrase => 
        content.includes(phrase) || content.startsWith(phrase)
    );

    if (isFollowUp) return true;

    const hasContext = COMPLAINT_PATTERNS.contextIndicators.some(indicator => 
        content.includes(indicator)
    );

    if (!hasContext) return false;

    for (const category of ['mainIssues', 'technicalIssues', 'performanceIssues', 'playbackIssues', 'accountIssues']) {
        for (const issue of COMPLAINT_PATTERNS[category]) {
            const issueIndex = content.indexOf(issue);
            if (issueIndex !== -1) {
                if (hasNegation(content, words.findIndex(word => word.includes(issue)))) {
                    if (content.includes('fine') || 
                        content.includes('good') || 
                        content.includes('great') || 
                        content.includes('perfect') || 
                        content.includes('works') || 
                        content.includes('working')) {
                        continue;
                    }
                }
                return true;
            }
        }
    }

    const hasStatusQuery = COMPLAINT_PATTERNS.statusQueries.some(query => {
        const queryIndex = content.indexOf(query);
        return queryIndex !== -1 && !hasNegation(content, words.findIndex(word => word.includes(query)));
    });

    return hasStatusQuery;
}

const SASS_RESPONSES = [
    "Oh wow, hexa watch isn't working? You mean like your critical thinking skills? Tragic.",
    "Damn, another complaint? Your life must be exhausting with all that whining.",
    "hexa watch is down? Good. Maybe take this time to rethink your priorities.",
    "Oh no, hexa watch isn't working for you? I bet your internet provider and your parents are equally disappointed in your choices.",
    "Breaking news: Crying in the comments doesn't magically fix servers.",
    "Have you tried stepping outside for once? The graphics are pretty decent out there.",
    "''I can't watch my stream!!' And yet, here you are, fully capable of typing complaints. Fascinating.",
    "Error 500: Your patience not found. Try debugging your entitled attitude.",
    "hexa watch runs better when you stop complaining and start having patience. Shocking, I know.",
    "Ah yes, let me just personally fix the entire website because your life revolves around a screen.",
    "You paid zero dollars, and yet, you act like a shareholder. Amazing.",
    "hexa watch's servers might be struggling, but they still have more uptime than your job prospects.",
    "This isn't McDonald's, we don't serve 'instantly fixed tech problems' with a side of fries.",
    "Did you try sacrificing a goat to the internet gods? Because that's about as useful as your whining.",
    "'hexa watch is broken!' Oh no, however will we recover from your deeply insightful feedback?",
    "Your ability to complain is impressive, if only it were matched by your ability to solve problems.",
    "Weird, works fine for people with patience and common sense.",
    "It's a free service, not a human right. Adjust your expectations accordingly.",
    "The issue is under review. By which I mean, ignored. Completely.",
    "hexa watch is down? So is your attitude. Maybe fix that first.",
    "'Site won't load' - Have you considered asking your WiFi router why it hates you?",
    "Somewhere, a hexa watch dev just saw your complaint and rolled their eyes so hard they entered another dimension.",
    "'This site is garbage!' - And yet, here you are, digging through it like a raccoon.",
    "Patience is a virtue. Sadly, not one you possess.",
    "hexa watch will be back soon. Hopefully, your dignity will return with it.",
    "If you want something that never fails, try staring at a blank wall.",
    "Your keyboard must be tired from all this complaining. Let it rest.",
    "Weird, the site works fine for people who don't have a victim complex.",
    "Have you tried logging out, touching grass, and coming back in 30 minutes?",
    "Nothing is truly free, except your complaints, which we will continue to ignore.",
    "'This site is trash!' Thanks for your input, Captain Obvious.",
    "We get it, you don't like waiting. Neither did your ex. Move on.",
    "hexa watch is currently down, much like your sense of patience and reason.",
    "Oh no, a website isn't working! How will the world survive this earth-shattering event?!",
    "hexa watch isn't working? That's crazy, considering all the effort you put into being a keyboard warrior.",
    "Your complaint has been carefully filed in our imaginary trash can.",
    "If I had a nickel for every time someone complained, I'd still be underpaid.",
    "Imagine if you put this much effort into something that actually mattered.",
    "If crying fixed servers, hexa watch would be the most stable site on the internet.",
    "Your feedback has been noted. And by noted, I mean laughed at.",
    "Ever considered that hexa watch is down just to give you time to reflect on your life choices?",
    "Welcome to technology: sometimes things break. You'll survive. Probably.",
    "Complaining here is like yelling at a microwave when your food's still cold.",
    "Your entitlement is showing. Might want to tuck that back in.",
    "Instead of refreshing the page, refresh your personality.",
    "hexa watch is having issues? So is humanity, but here we are.",
    "Shocking revelation: websites have downtime. More shocking: your lack of coping skills.",
    "We're aware of the issue. No, that doesn't mean we care more just because you whined.",
    "The real bug here is your inability to function without a video stream.",
    "Did you reboot your expectations? Because they need a hard reset.",
    "Your patience loading... ERROR 404: Not Found.",
    "Instead of reporting it, why not fix your attitude? It's been broken longer than hexa watch.",
    "hexa watch's status: down. Your self-awareness: also down.",
    "Try again later, just like you do with every other failure in your life.",
    "We are experiencing technical difficulties, but your personality has been broken for years.",
    "'This site sucks!' So does your attitude, and yet here we are.",
    "We've forwarded your complaint to the department of Absolutely No One Cares.",
    "At least hexa watch tries to work. Can you say the same for yourself?",
    "hexa watch's uptime is still better than your dating life.",
    "Instead of refreshing the page, refresh your career goals.",
    "If hexa watch is so bad, why are you still here? Oh right, nowhere better to be."
];


let lastMessageTime = Date.now();

async function searchTMDB(query, type = 'multi') {
    try {
        const url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
        console.log('Searching TMDB with URL:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('TMDB Response:', data);
        
        if (data.success === false) {
            console.error('TMDB API Error:', data.status_message);
            return { results: [] };
        }
        
        return data;
    } catch (error) {
        console.error('Error searching TMDB:', error);
        return { results: [] };
    }
}

async function getDetails(id, type) {
    try {
        const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}`;
        console.log('Getting details from URL:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('TMDB Details Response:', data);
        
        if (data.success === false) {
            console.error('TMDB API Error:', data.status_message);
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Error getting TMDB details:', error);
        return null;
    }
}

async function getSeasonDetails(showId, seasonNumber) {
    try {
        const url = `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting season details:', error);
        return null;
    }
}

function createResultEmbed(result, details, currentPage, totalResults) {
    const isMovie = result.media_type === 'movie';
    
    const embed = new EmbedBuilder()
        .setColor('#000000')
        .setTitle(isMovie ? details.title : details.name)
        .setDescription(details.overview || 'No description available.')
        .addFields([
            { 
                name: '📅 Release Date',
                value: (isMovie ? details.release_date : details.first_air_date) || 'No date available',
                inline: true 
            },
            { 
                name: '⭐ Rating',
                value: `${details.vote_average.toFixed(1)}/10`,
                inline: true 
            },
            {
                name: '📊 Results',
                value: `Page ${currentPage + 1} of ${totalResults}`,
                inline: true
            }
        ])
        .setTimestamp();

    if (details.poster_path) {
        embed.setThumbnail(`https://image.tmdb.org/t/p/w500${details.poster_path}`);
    }

    return embed;
}

async function checkWebsiteStatus(url) {
    try {
        const startTime = Date.now();
        const response = await fetch(url);
        const responseTime = Date.now() - startTime;
        
        return {
            online: response.ok,
            status: response.status,
            responseTime
        };
    } catch (error) {
        return {
            online: false,
            status: 0,
            responseTime: 0
        };
    }
}

async function updateStatusEmbed(channel) {
    const status = await checkWebsiteStatus(WEBSITE_URL);
    
    const embed = new EmbedBuilder()
        .setColor(status.online ? '#000000' : '#ff0000')
        .setTitle('Hexa Website Status')
        .addFields([
            {
                name: '🌐 Website',
                value: WEBSITE_URL,
                inline: true
            },
            {
                name: '📊 Status',
                value: status.online ? '🟢 Online' : '🔴 Offline',
                inline: true
            },
            {
                name: '⚡ Response Time',
                value: status.online ? `${status.responseTime}ms` : 'N/A',
                inline: true
            },
            {
                name: '🔍 Status Code',
                value: `\`${status.status}\``,
                inline: true
            }
        ])
        .setTimestamp()
        .setFooter({ 
            text: '• Hexa Status',
            iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
        });

    const messages = await channel.messages.fetch({ limit: 1 });
    const lastMessage = messages.first();

    if (lastMessage && lastMessage.author.id === client.user.id) {
        await lastMessage.edit({ embeds: [embed] });
    } else {
        await channel.send({ embeds: [embed] });
    }
}

function formatDuration(totalMinutes) {
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;
    
    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    
    return parts.join(', ');
}

const commands = {
    ping: (message) => {
        message.reply('🏓 Pong! Bot latency: ' + client.ws.ping + 'ms');
    },
    help: (message) => {
        const helpEmbed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle('🤖 Hexa Bot Commands')
            .setDescription('Here are all available commands:')
            .addFields([
                { 
                    name: '`hexa!ping`',
                    value: 'Check bot latency',
                    inline: true 
                },
                { 
                    name: '`hexa!help`',
                    value: 'Show this help message',
                    inline: true 
                },
                { 
                    name: '`hexa!github`',
                    value: 'Get GitHub repository link',
                    inline: true 
                },
                { 
                    name: '`hexa!search <query>`',
                    value: 'Search for movies and TV shows',
                    inline: true 
                },
                { 
                    name: '`hexa!status`',
                    value: 'Force update the website status',
                    inline: true 
                },
                { 
                    name: '`hexa!clear <amount>`',
                    value: 'Delete specified number of messages (1-100)',
                    inline: true 
                },
                { 
                    name: '`hexa!excuse`',
                    value: 'Get a random excuse for website issues',
                    inline: true 
                },
                { 
                    name: '`hexa!watchtime <title>`',
                    value: 'Calculate binge watch duration',
                    inline: true 
                },
                { 
                    name: '`hexa!random`',
                    value: 'Get a random movie or TV show suggestion',
                    inline: true 
                }
            ])
            .setFooter({ 
                text: '• Hexa Bot',
                iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
            });
        message.reply({ embeds: [helpEmbed] });
    },
    github: (message) => {
        message.reply('🔗 Check out our GitHub: https://github.com/hexatv');
    },
    search: async (message, args) => {
        if (!args.length) {
            message.reply('Please provide a search query! Example: `hexa!search Stranger Things`');
            return;
        }

        const query = args.join(' ');
        const results = await searchTMDB(query);

        if (!results.results?.length) {
            message.reply('No results found! This might be due to an invalid API key or no matching content.');
            return;
        }

        const topResults = results.results
            .filter(r => r.media_type === 'movie' || r.media_type === 'tv')
            .slice(0, 5);

        if (!topResults.length) {
            message.reply('No movies or TV shows found in the results.');
            return;
        }

        let currentPage = 0;
        const details = await getDetails(topResults[0].id, topResults[0].media_type === 'movie' ? 'movie' : 'tv');
        
        const embed = createResultEmbed(topResults[0], details, currentPage, topResults.length);

        const prevButton = new ButtonBuilder()
            .setCustomId('prev')
            .setLabel('◀️ Previous')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);

        const nextButton = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next ▶️')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(topResults.length <= 1);

        const watchButton = new ButtonBuilder()
            .setLabel('Watch Now')
            .setStyle(ButtonStyle.Link)
            .setURL(topResults[0].media_type === 'movie' 
                ? `https://hexa.watch/watch/movie/${topResults[0].id}`
                : `https://hexa.watch/watch/tv/${topResults[0].id}/1/1`);

        const row = new ActionRowBuilder().addComponents(prevButton, watchButton, nextButton);

        const response = await message.channel.send({
            embeds: [embed],
            components: [row]
        });

        const collector = response.createMessageComponentCollector({
            time: 60000 // 1 minute timeout
        });

        collector.on('collect', async (interaction) => {
            if (interaction.user.id !== message.author.id) {
                interaction.reply({ content: 'This is not your search result!', ephemeral: true });
                return;
            }

            if (interaction.customId === 'prev') {
                currentPage = Math.max(0, currentPage - 1);
            } else if (interaction.customId === 'next') {
                currentPage = Math.min(topResults.length - 1, currentPage + 1);
            }

            const result = topResults[currentPage];
            const newDetails = await getDetails(result.id, result.media_type === 'movie' ? 'movie' : 'tv');
            const newEmbed = createResultEmbed(result, newDetails, currentPage, topResults.length);

            prevButton.setDisabled(currentPage === 0);
            nextButton.setDisabled(currentPage === topResults.length - 1);
            watchButton.setURL(result.media_type === 'movie' 
                ? `https://hexa.watch/watch/movie/${result.id}`
                : `https://hexa.watch/watch/tv/${result.id}/1/1`);

            const newRow = new ActionRowBuilder().addComponents(prevButton, watchButton, nextButton);

            await interaction.update({
                embeds: [newEmbed],
                components: [newRow]
            });
        });

        collector.on('end', () => {
            prevButton.setDisabled(true);
            nextButton.setDisabled(true);
            const finalRow = new ActionRowBuilder().addComponents(prevButton, watchButton, nextButton);
            response.edit({ components: [finalRow] });
        });
    },
    status: async (message) => {
        if (message.channel.id === STATUS_CHANNEL) {
            await updateStatusEmbed(message.channel);
            message.delete().catch(console.error);
        } else {
            message.reply('Status command can only be used in the status channel!');
        }
    },
    clear: async (message, args) => {
        try {
            if (!message.member.permissions.has('ManageMessages')) {
                console.log('Permission denied for user:', message.author.tag);
                message.reply('You do not have permission to use this command!');
                return;
            }

            const amount = parseInt(args[0]);

            if (isNaN(amount)) {
                message.reply('Please provide a valid number of messages to delete!');
                return;
            }

            if (amount < 1 || amount > 100) {
                message.reply('Please provide a number between 1 and 100!');
                return;
            }

            await message.delete();

            const fetched = await message.channel.messages.fetch({ limit: amount });
            console.log(`Attempting to delete ${fetched.size} messages...`);
            
            const deleted = await message.channel.bulkDelete(fetched, true);
            console.log(`Successfully deleted ${deleted.size} messages`);

            const confirmMessage = await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#000000')
                        .setDescription(`🗑️ Successfully deleted ${deleted.size} messages!`)
                        .setFooter({ 
                            text: '• This message will auto-delete in 5 seconds',
                            iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
                        })
                ]
            });

            setTimeout(() => {
                confirmMessage.delete().catch(() => {});
            }, 5000);

        } catch (error) {
            console.error('Error in clear command:', error);
            if (error.code === 50034) {
                message.reply('Cannot delete messages older than 14 days!');
            } else if (error.code === 50013) {
                message.reply('The bot does not have permission to delete messages in this channel!');
            } else {
                message.reply(`Error: ${error.message}`);
            }
        }
    },
    excuse: async (message) => {
        const excuse = WEBSITE_EXCUSES[Math.floor(Math.random() * WEBSITE_EXCUSES.length)];
        
        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle('🤷 Why is the website down?')
            .setDescription(excuse)
            .addFields([
                {
                    name: 'Real Status',
                    value: (await checkWebsiteStatus(WEBSITE_URL)).online ? '🟢 Actually... it\'s online!' : '🔴 Yeah... it\'s really down',
                    inline: true
                }
            ])
            .setTimestamp()
            .setFooter({ 
                text: '• Hexa Excuses',
                iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
            });

        await message.reply({ embeds: [embed] });
    },
    watchtime: async (message, args) => {
        if (!args.length) {
            message.reply('Please provide a search query! Example: `hexa!watchtime Breaking Bad`');
            return;
        }

        const query = args.join(' ');
        const results = await searchTMDB(query);

        if (!results.results?.length) {
            message.reply('No results found!');
            return;
        }

        const result = results.results.find(r => r.media_type === 'tv' || r.media_type === 'movie');
        
        if (!result) {
            message.reply('No TV shows or movies found with that name!');
            return;
        }

        const isMovie = result.media_type === 'movie';
        const details = await getDetails(result.id, isMovie ? 'movie' : 'tv');

        if (!details) {
            message.reply('Failed to get details for this title!');
            return;
        }

        let totalMinutes = 0;
        let episodeCount = 0;
        let seasonCount = 0;
        let averageEpisodeLength = 0;

        if (isMovie) {
            totalMinutes = details.runtime || 0;
        } else {
            seasonCount = details.number_of_seasons || 0;
            episodeCount = details.number_of_episodes || 0;
            let totalEpisodeMinutes = 0;
            let episodesWithRuntime = 0;

            for (let i = 1; i <= seasonCount; i++) {
                const seasonDetails = await getSeasonDetails(details.id, i);
                if (seasonDetails && seasonDetails.episodes) {
                    seasonDetails.episodes.forEach(episode => {
                        if (episode.runtime) {
                            totalEpisodeMinutes += episode.runtime;
                            episodesWithRuntime++;
                        }
                    });
                }
            }

            if (episodesWithRuntime > 0) {
                averageEpisodeLength = Math.round(totalEpisodeMinutes / episodesWithRuntime);
                totalMinutes = episodeCount * averageEpisodeLength;
            } else {
                averageEpisodeLength = details.episode_run_time?.[0] || 0;
                totalMinutes = episodeCount * averageEpisodeLength;
            }
        }

        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle(`⏱️ Binge Watch Calculator`)
            .setDescription(`Here's how long it would take to watch **${details.name || details.title}**`)
            .addFields([
                {
                    name: '🎬 Total Duration',
                    value: formatDuration(totalMinutes) || 'Unknown duration',
                    inline: false
                }
            ]);

        if (!isMovie) {
            embed.addFields([
                {
                    name: '📺 Episodes',
                    value: `${episodeCount} episodes across ${seasonCount} season${seasonCount !== 1 ? 's' : ''}`,
                    inline: true
                },
                {
                    name: '⏲️ Per Episode',
                    value: averageEpisodeLength > 0 ? 
                        `${averageEpisodeLength} minutes (average from TMDB)` : 
                        'Runtime information unavailable',
                    inline: true
                }
            ]);
        }

        if (totalMinutes > 0) {
            const funCalculations = [
                {
                    name: '🍿 Binge Watching (8h/day)',
                    value: `${formatDuration(totalMinutes)} total\n≈ ${Math.ceil(totalMinutes / (8 * 60))} days of binge watching`,
                    inline: false
                },
                {
                    name: '🎯 Speed Running (12h/day)',
                    value: `≈ ${Math.ceil(totalMinutes / (12 * 60))} days`,
                    inline: true
                },
                {
                    name: '🐌 Casual (2h/day)',
                    value: `≈ ${Math.ceil(totalMinutes / (2 * 60))} days`,
                    inline: true
                }
            ];

            embed.addFields(funCalculations);
        }

        if (details.poster_path) {
            embed.setThumbnail(`https://image.tmdb.org/t/p/w500${details.poster_path}`);
        }

        embed.setFooter({ 
            text: '• Hexa Watch Time',
            iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
        });

        message.reply({ embeds: [embed] });
    },
    random: async (message) => {
        try {
            const [movies, tvShows] = await Promise.all([
                getPopular('movie'),
                getPopular('tv')
            ]);

            const allContent = [...movies, ...tvShows]
                .filter(item => item.vote_average >= 6)
                .sort(() => Math.random() - 0.5);

            if (!allContent.length) {
                message.reply('Failed to get random content. Please try again!');
                return;
            }

            const randomContent = allContent[0];
            const isMovie = !('first_air_date' in randomContent);

            const details = await getDetails(randomContent.id, isMovie ? 'movie' : 'tv');

            const embed = new EmbedBuilder()
                .setColor('#000000')
                .setTitle('🎲 Random Pick')
                .setDescription(`Here's a random ${isMovie ? 'movie' : 'TV show'} for you to watch!\n\n**${details.title || details.name}**\n\n${details.overview}`)
                .addFields([
                    {
                        name: '📅 Release Date',
                        value: isMovie ? details.release_date : details.first_airdate,
                        inline: true
                    },
                    {
                        name: '⭐ Rating',
                        value: `${details.vote_average.toFixed(1)}/10`,
                        inline: true
                    },
                    {
                        name: '⏱️ Duration',
                        value: isMovie ? 
                            `${details.runtime} minutes` : 
                            `${details.number_of_episodes} episodes (${details.number_of_seasons} season${details.number_of_seasons !== 1 ? 's' : ''})`,
                        inline: true
                    }
                ])
                .setTimestamp()
                .setFooter({ 
                    text: '• Hexa Random',
                    iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
                });

            if (details.poster_path) {
                embed.setImage(`https://image.tmdb.org/t/p/w500${details.poster_path}`);
            }

            const watchButton = new ButtonBuilder()
                .setLabel('Watch Now')
                .setStyle(ButtonStyle.Link)
                .setURL(isMovie ? 
                    `https://hexa.watch/watch/movie/${details.id}` :
                    `https://hexa.watch/watch/tv/${details.id}/1/1`
                );

            const row = new ActionRowBuilder().addComponents(watchButton);

            await message.reply({
                embeds: [embed],
                components: [row]
            });

        } catch (error) {
            console.error('Error in random command:', error);
            message.reply('Something went wrong while getting a random pick. Please try again!');
        }
    }
};

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('hexa!help', { type: 'LISTENING' });

    const channel = client.channels.cache.get(CHAT_CHANNEL);
    if (channel) {
        try {
            const messages = await channel.messages.fetch({ limit: 1 });
            const lastMessage = messages.first();
            lastMessageTime = lastMessage ? lastMessage.createdTimestamp : Date.now();
            console.log('Initialized lastMessageTime:', new Date(lastMessageTime).toLocaleString());
        } catch (error) {
            console.error('Error fetching last message:', error);
            lastMessageTime = Date.now();
        }
    }

    const statusChannel = client.channels.cache.get(STATUS_CHANNEL);
    if (statusChannel) {
        await updateStatusEmbed(statusChannel);
        setInterval(async () => {
            await updateStatusEmbed(statusChannel);
        }, 60000);
    }

    console.log('Setting up chat checker...');
    setInterval(async () => {
        const channel = client.channels.cache.get(CHAT_CHANNEL);
        if (channel) {
            const timeSinceLastMessage = Date.now() - lastMessageTime;
            const minutesSince = Math.floor(timeSinceLastMessage / 60000);
            console.log(`Time since last message: ${minutesSince} minutes (${timeSinceLastMessage}ms)`);
            
            if (timeSinceLastMessage >= CHAT_TIMEOUT) {
                console.log('Starting self-conversation...');
                try {
                    await generateSelfConversation(channel);
                    lastMessageTime = Date.now();
                    console.log('Self-conversation completed, reset timer');
                } catch (error) {
                    console.error('Error in self-conversation:', error);
                }
            }
        }
    }, CHECK_INTERVAL);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content) return;

    if (message.channel.id === CHAT_CHANNEL) {
        lastMessageTime = Date.now();
    }

    if (isComplaint(message.content)) {
        if (Math.random() < 0.7) {
            const response = SASS_RESPONSES[Math.floor(Math.random() * SASS_RESPONSES.length)];
            
            // Add a small delay
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
            
            try {
                await message.reply(response);
                console.log('Responded to complaint:', message.content);
            } catch (error) {
                console.error('Error sending sass response:', error);
            }
        }
    }

    if (message.content.startsWith(PREFIX)) {
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (commands[command]) {
            commands[command](message, args);
            return;
        }
    }

    if (message.channel.id === PROJECT_UPDATES_CHANNEL && 
        message.embeds.length > 0 && 
        message.author.username === 'GitHub') {
        
        const embed = message.embeds[0];
        
        if (embed.description && embed.description.includes('commit/')) {
            console.log('Processing GitHub commit message');
            
            const commitHash = embed.description.match(/\[`(.*?)`\]/)[1];
            
            const commitUrl = embed.description.match(/\(([^)]+)\)/)[1];
            
            const messageStart = embed.description.indexOf(') ') + 2;
            const messageAndAuthor = embed.description.slice(messageStart);
            
            const lastDashIndex = messageAndAuthor.lastIndexOf(' - ');
            const commitMessage = messageAndAuthor.slice(0, lastDashIndex);
            const author = messageAndAuthor.slice(lastDashIndex + 3);

            const newEmbed = new EmbedBuilder()
                .setColor('#000000')
                .setTitle(`🔄 New Update`)
                .setURL(commitUrl)
                .setDescription(`> ${commitMessage}\n\n**Commit:** [\`${commitHash}\`](${commitUrl})`)
                .addFields([
                    { 
                        name: '📁 Branch',
                        value: '`main`',
                        inline: true 
                    },
                    { 
                        name: '👨‍💻 Author',
                        value: `\`${author}\``,
                        inline: true 
                    }
                ])
                .setTimestamp()
                .setFooter({ 
                    text: '• Hexa Update',
                    iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
                });

            try {
                await message.delete();
                await message.channel.send({ embeds: [newEmbed] });
                console.log('Successfully processed and replaced message');
            } catch (error) {
                console.error('Error handling webhook message:', error);
            }
        }
    }
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (newPresence.userId === HEXA_USER_ID) {
        if (newPresence.status === 'offline') {
            const channel = client.channels.cache.get(NOTIFICATIONS_CHANNEL);
            if (channel) {
                const embed = new EmbedBuilder()
                    .setColor('#000000')
                    .setTitle('👀 Hexa went to sleep!')
                    .setDescription('It seems hexa is sleeping... no one is stopping you to make a rampage in here 🥳')
                    .setTimestamp()
                    .setFooter({ 
                        text: '• Hexa Status',
                        iconURL: 'https://cdn.discordapp.com/attachments/1338131774030483466/1339358494842683452/onderwereld.png'
                    });

                await channel.send({ embeds: [embed] });
            }
        }
    }
});

async function getPopular(type = 'movie') {
    try {
        const url = `https://api.themoviedb.org/3/${type}/popular?api_key=${TMDB_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error getting popular ${type}s:`, error);
        return [];
    }
}

async function generateSelfConversation(channel) {
    try {
        const guild = channel.guild;
        const members = Array.from(guild.members.cache.values())
            .filter(member => !member.user.bot); // Filter out bots

        if (members.length < 2) {
            console.log('Not enough members for a conversation');
            return;
        }

        const conversationMembers = members
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.random() > 0.5 ? 2 : 3);

        const starter = CONVERSATION_STARTERS[Math.floor(Math.random() * CONVERSATION_STARTERS.length)];
        console.log('Sending starter from:', conversationMembers[0].user.username);
        await channel.send({
            content: starter,
            allowedMentions: { parse: [] },
            webhookData: {
                username: conversationMembers[0].displayName,
                avatarURL: conversationMembers[0].user.displayAvatarURL()
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 15000 + Math.random() * 10000));
        
        const response = CONVERSATION_RESPONSES[Math.floor(Math.random() * CONVERSATION_RESPONSES.length)];
        console.log('Sending response from:', conversationMembers[1].user.username);
        await channel.send({
            content: response,
            allowedMentions: { parse: [] },
            webhookData: {
                username: conversationMembers[1].displayName,
                avatarURL: conversationMembers[1].user.displayAvatarURL()
            }
        });
        
        await new Promise(resolve => setTimeout(resolve, 20000 + Math.random() * 10000));
        
        const conclusion = CONVERSATION_CONCLUSIONS[Math.floor(Math.random() * CONVERSATION_CONCLUSIONS.length)];
        console.log('Sending conclusion from:', 
            conversationMembers[2] ? conversationMembers[2].user.username : conversationMembers[0].user.username);
        await channel.send({
            content: conclusion,
            allowedMentions: { parse: [] },
            webhookData: {
                username: conversationMembers[2] ? conversationMembers[2].displayName : conversationMembers[0].displayName,
                avatarURL: conversationMembers[2] ? 
                    conversationMembers[2].user.displayAvatarURL() : 
                    conversationMembers[0].user.displayAvatarURL()
            }
        });
    } catch (error) {
        console.error('Error in generateSelfConversation:', error);
        throw error;
    }
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

client.login(process.env.DISCORD_TOKEN);
