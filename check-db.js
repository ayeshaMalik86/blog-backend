const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'blog.db');
const db = new sqlite3.Database(dbPath);

console.log('Checking blog posts in database...\n');

db.all("SELECT * FROM blog_posts", (err, rows) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  if (rows.length === 0) {
    console.log('No blog posts found. Creating sample posts...');
    
    const samplePosts = [
      {
        title: "Welcome to Our Blog!",
        content: "This is our first blog post. We're excited to share our thoughts and insights with you. Stay tuned for more amazing content!",
        author: "Admin"
      },
      {
        title: "Getting Started with Web Development",
        content: "Web development can seem overwhelming at first, but with the right tools and mindset, anyone can learn to build amazing websites. Start with HTML, CSS, and JavaScript, then explore frameworks like Vue.js or React.",
        author: "Sarah Johnson"
      },
      {
        title: "The Future of Technology",
        content: "Technology is evolving at an incredible pace. From artificial intelligence to quantum computing, we're witnessing breakthroughs that will shape our future. It's an exciting time to be alive!",
        author: "Mike Chen"
      }
    ];
    
    const stmt = db.prepare("INSERT INTO blog_posts (title, content, author, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)");
    
    samplePosts.forEach(post => {
      const now = new Date().toISOString();
      stmt.run(post.title, post.content, post.author, now, now);
      console.log(`Created post: "${post.title}" by ${post.author}`);
    });
    
    stmt.finalize();
    console.log('\nSample posts created successfully!');
  } else {
    console.log('Current blog posts:');
    rows.forEach((row, index) => {
      console.log(`\n${index + 1}. Title: ${row.title}`);
      console.log(`   Author: ${row.author}`);
      console.log(`   Content: ${row.content.substring(0, 100)}...`);
      console.log(`   Created: ${row.createdAt}`);
    });
  }
  
  db.close();
});
