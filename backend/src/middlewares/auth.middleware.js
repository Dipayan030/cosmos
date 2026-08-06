import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export const verifyToken = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return res.status(401).json({ error: "Access denied. Invalid token"});
        };
        const token = authHeader.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }
        req.user = user;
        next();

    } catch (err){
        console.error("Error fetching token:", err);
        return res.status(500).json({ error: 'Internal server error during authentication.' });
    }
}; 