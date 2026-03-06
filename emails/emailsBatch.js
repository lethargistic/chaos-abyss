import { Resend } from 'resend';
import dotenv from 'dotenv';

// NOTE: maximum batch size for Resend is 50
// + the 100 a day email limit
// filter csv to only use the subscribed ones later

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const getEmails = async () => {
    try {
        const response = await resend.contacts.list({
            audienceId: '2a9064d6-92c6-42c5-a9dc-85fd7b8eaf78',
        });

        return response.data.data.map(obj => obj.email);
    } catch (error) {
        console.log(error);
    }
}

const content =
    `
        <p>
        Hey!
        </p>
        <p>
        Just sending this automatic email as confirmation that you signed up to get occasional updates on Lirith. 
        </p>
        <img width="460" src="https://ik.imagekit.io/maksiks/moth.png?tr=w-460" alt="lirith logo">
        <p>
        Thanks!
        </p>
    `

const emailsBatch = await getEmails();

const emailsWithInfo = emailsBatch.map((email) => ({
    from: 'Leth <lirith@chaos-abyss.com>',
    to: [email],
    subject: 'Lirith updates',
    html: content
}))

await resend.batch.send(emailsWithInfo);

await resend.emails.send([
    {
        from: 'Leth <lirith@chaos-abyss.com>',
        to: [email],
        subject: 'Lirith updates',
        html: content
    }
]);