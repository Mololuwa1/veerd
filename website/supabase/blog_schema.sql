-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT NOT NULL,
  published_at DATE DEFAULT CURRENT_DATE,
  reading_time TEXT DEFAULT '5 min',
  category TEXT DEFAULT 'Career change',
  meta_description TEXT DEFAULT '',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- RLS: Allow public to read published posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow reading all posts (admin reads drafts too, public pages filter by status='published' in code)
CREATE POLICY "Allow public to read posts"
  ON blog_posts
  FOR SELECT
  USING (true);

-- Allow anon to insert/update/delete (protected by API password)
CREATE POLICY "Allow anon to insert posts"
  ON blog_posts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anon to update posts"
  ON blog_posts
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon to delete posts"
  ON blog_posts
  FOR DELETE
  USING (true);

-- Seed with existing blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, published_at, reading_time, category, meta_description, status) VALUES
(
  'how-to-know-if-you-are-in-the-wrong-job',
  'How to know if you are in the wrong job: the honest checklist',
  'Not every bad week means you need to quit. But some patterns are worth paying attention to. Here is an honest checklist to help you figure out whether it is time to explore something new.',
  E'## The Sunday night test\n\nMost people start here. If the thought of Monday morning fills you with a specific kind of dread, not tiredness, not laziness, but a deep resistance, that is worth noticing.\n\nBut one bad Sunday does not mean you need to change careers. What matters is the pattern. Has this been happening for months? Has it survived a holiday, a new project, a new manager?\n\n## You have stopped learning\n\nEvery job has a learning curve. At the start everything is new and challenging. But if you have been in the same role for two or more years and you cannot point to something meaningful you have learned recently, that is a signal.\n\nGrowth does not always mean promotion. It can mean new skills, new perspectives, new challenges. If none of those are present, your career is stagnating.\n\n## The identity question\n\nHere is the question that catches people off guard: when someone asks what you do at a dinner party, how do you feel?\n\nIf you find yourself deflecting, minimising, or changing the subject, that tells you something. Not because your job needs to be impressive, but because you should feel some connection to the work you spend most of your waking hours doing.\n\n## You are jealous of specific people\n\nGeneral career envy is normal and usually meaningless. But if you find yourself consistently jealous of people in a specific field, reading their LinkedIn posts with genuine longing, wondering what their day looks like, that specificity matters.\n\nIt is pointing you somewhere. Pay attention to it.\n\n## The energy audit\n\nTrack your energy for two weeks. At the end of each day, note what gave you energy and what drained it. Be honest: not what should energise you, but what actually does.\n\nIf the draining activities make up 80 percent of your job and the energising ones barely feature, the problem is structural. No amount of mindset work will fix a fundamental mismatch.\n\n## What to do with this information\n\nIf three or more of these resonate, you are probably not in the wrong job by accident. Something systematic is misaligned.\n\nThe next step is not to quit. It is to explore. Talk to someone who has made the transition you are considering. Map the skills gap. Understand the reality before you commit.\n\nThat is exactly what Veerd is built for.',
  '2024-12-15',
  '6 min',
  'Career change',
  'An honest checklist to help you figure out whether you are in the wrong job, and what to do about it.',
  'published'
),
(
  'career-change-at-35-is-it-too-late',
  'Career change at 35: is it too late',
  'You have a mortgage, maybe kids, definitely responsibilities. The window feels like it is closing. But the data tells a different story, and so do the people who have actually done it.',
  E'## The myth of the closing window\n\nThere is a persistent belief that career changes need to happen in your twenties. That by 35 you have made your bed and need to lie in it. This is not just wrong, it is the opposite of what the data shows.\n\nThe average age of a successful career changer is 39. Not 25. Not 28. Thirty-nine.\n\n## Why 35 is actually a good time\n\nAt 35 you have something a 25 year old does not: a decade of professional skills, a network, financial literacy, and crucially, self-knowledge. You actually know what you want now, which is not something most people can say in their twenties.\n\nYou also have transferable skills you probably underestimate. Project management, stakeholder communication, problem solving, dealing with ambiguity. These are not job-specific skills. They are career-portable.\n\n## The real obstacles are not what you think\n\nThe biggest barrier to career change at 35 is not age. It is identity. You have spent a decade building a professional identity and the thought of dismantling it feels existential.\n\nThis is normal. Every career changer we have spoken to describes this same feeling. The key insight is that you are not starting from zero. You are starting from ten years of experience, applied in a new direction.\n\n## The financial reality\n\nLet us be honest about money. At 35 you probably cannot afford to take a 50 percent pay cut for three years while you retrain. But the good news is that most career transitions do not require that.\n\nThe average salary dip during a career transition lasts 12 to 18 months. Many people return to their previous salary level within two years and exceed it within three.\n\n## What the people who have done it say\n\nWe asked 50 Twins, people who successfully changed careers between 30 and 40, what they wish they had known. The most common answer was not about money or skills. It was: I wish I had known how normal the fear was, and that everyone who did this felt the same way.\n\n## The cost of not changing\n\nHere is the calculation most people forget to make: what is the cost of staying? Not just financially, but in terms of energy, health, relationships, and fulfilment.\n\nIf you are 35 and you stay in a career you know is wrong for you, you have 30 more working years of that feeling ahead. That is the real risk.\n\n## Next steps\n\nIf you are reading this at 35 and wondering whether it is too late, it is not. But wondering is not the same as exploring. Talk to someone who has made the exact transition you are considering. Map the real skills gap, not the imagined one. Understand what the first 90 days actually look like.',
  '2024-12-08',
  '8 min',
  'Career change',
  'Is 35 too late for a career change? The data says no. Here is what actually matters, and what the people who have done it wish they had known.',
  'published'
),
(
  'how-to-talk-to-someone-who-changed-careers',
  'How to have an informational interview that actually helps',
  'Most informational interviews are a waste of time because people ask the wrong questions. Here is how to have a conversation that gives you real clarity about a career transition.',
  E'## Why most informational interviews fail\n\nYou find someone on LinkedIn who has made the career change you are considering. You send a polite message. They agree to a 30 minute call. And then you ask: so what is it like working in product management?\n\nThat question, and ones like it, is why most informational interviews produce nothing useful. They are too broad, too polite, and too focused on the destination rather than the journey.\n\n## Ask about the transition, not the job\n\nThe most valuable information is not about what they do now. It is about how they got there. The messy middle. The moments of doubt. The things that surprised them.\n\nHere are five questions that actually produce useful answers:\n\n**What was the hardest part of the transition that nobody warned you about?**\n\nThis gets past the polished LinkedIn narrative. Everyone has a version of their career change story that sounds clean and intentional. The real story is messier. You want the real story.\n\n**What skills from your previous career turned out to be more valuable than you expected?**\n\nThis helps you see your own transferable skills more clearly. Career changers consistently underestimate what they bring from their previous role.\n\n**If you could go back to the moment you were deciding, what would you tell yourself?**\n\nThis surfaces the emotional reality of the transition. Was the fear justified? What turned out to be easier, or harder, than expected?\n\n**What did the first 90 days actually look like?**\n\nThis grounds the conversation in practical reality. Not the six month view or the three year view, but the immediate experience of starting something new.\n\n**What is the one thing about this career that would make someone NOT want to do it?**\n\nThis is the question most people are too polite to ask. But it is the most important one. You need to know the downsides from someone who lives with them every day.\n\n## How to find the right person\n\nDo not just look for someone with the job title you want. Look for someone who made a similar transition to yours. The finance to UX designer journey is different from the teaching to UX designer journey, even though the destination is the same.\n\n## After the conversation\n\nWrite down everything within 24 hours. Not just the facts, but how you felt during the conversation. Were you energised? Scared in a good way? Confirmed in your doubts? Your emotional response to the conversation is data.\n\n## A better way\n\nInformational interviews are valuable but limited. You are relying on the goodwill of strangers, the conversation is often surface level, and there is no structure or follow-up.\n\nThat is why we built Veerd. Every Twin call is an informational interview, but with someone specifically matched to your situation, prepared to have an honest conversation, and supported by 30 days of structured exploration before and after.',
  '2024-11-28',
  '5 min',
  'Transition tips',
  'How to have an informational interview that gives you real clarity about a career change. Five questions that actually produce useful answers.',
  'published'
)
ON CONFLICT (slug) DO NOTHING;
