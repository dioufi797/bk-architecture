require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Project = require('../src/models/Project');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bk-architecture');
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL || 'admin@bk-architecture.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@2024!',
      role: 'admin',
    });
    console.log(`✅ Admin created: ${admin.email}`);

    const sampleProjects = [
      {
        title: 'Villa Lumière',
        description: 'Une villa contemporaine de luxe alliant modernité et harmonie avec la nature. Conçue avec des matériaux nobles et une attention particulière aux détails, cette résidence offre une expérience de vie incomparable.',
        category: 'residential',
        images: [{ url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200', publicId: 'villa-lumiere-1' }],
        coverImage: { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200' },
        date: new Date('2024-03-15'),
        client: 'Famille Martin',
        location: 'Casablanca, Maroc',
        area: '650 m²',
        status: 'completed',
        featured: true,
        tags: ['luxe', 'contemporain', 'villa'],
      },
      {
        title: 'Tour Horizon',
        description: 'Un immeuble de bureaux signature qui redéfinit le skyline urbain. Sa façade en verre reflète le ciel et transforme l\'architecture en sculpture vivante.',
        category: 'commercial',
        images: [{ url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200', publicId: 'tour-horizon-1' }],
        coverImage: { url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200' },
        date: new Date('2023-11-20'),
        client: 'Groupe Immobilier Atlas',
        location: 'Rabat, Maroc',
        area: '12,000 m²',
        status: 'completed',
        featured: true,
        tags: ['commercial', 'bureau', 'tour'],
      },
      {
        title: 'Résidence Les Palmiers',
        description: 'Un complexe résidentiel de standing offrant 48 appartements de haut standing avec vue panoramique. Jardins paysagers, piscine et espaces de détente.',
        category: 'residential',
        images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200', publicId: 'palmiers-1' }],
        coverImage: { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200' },
        date: new Date('2024-01-10'),
        client: 'Promoteur Résidentiel Maroc',
        location: 'Marrakech, Maroc',
        area: '8,400 m²',
        status: 'ongoing',
        featured: false,
        tags: ['résidentiel', 'appartements', 'luxe'],
      },
      {
        title: 'Centre Commercial Nova',
        description: 'Un centre commercial de nouvelle génération combinant commerce, gastronomie et loisirs dans un espace architectural épuré et lumineux.',
        category: 'commercial',
        images: [{ url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200', publicId: 'nova-1' }],
        coverImage: { url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200' },
        date: new Date('2023-07-05'),
        client: 'Mall Developers SA',
        location: 'Agadir, Maroc',
        area: '25,000 m²',
        status: 'completed',
        featured: true,
        tags: ['commercial', 'retail', 'mall'],
      },
      {
        title: 'Loft Urbain',
        description: 'Rénovation complète d\'un espace industriel transformé en loft d\'exception. L\'alliance du brut et du raffiné crée une atmosphère unique et contemporaine.',
        category: 'interior',
        images: [{ url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200', publicId: 'loft-1' }],
        coverImage: { url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200' },
        date: new Date('2024-04-22'),
        client: 'M. Benali',
        location: 'Casablanca, Maroc',
        area: '320 m²',
        status: 'completed',
        featured: false,
        tags: ['intérieur', 'loft', 'rénovation'],
      },
      {
        title: 'Hôtel Sahara Prestige',
        description: 'Un hôtel 5 étoiles inspiré de l\'architecture traditionnelle marocaine revisitée par un design contemporain. 120 suites, spa, restaurants gastronomiques.',
        category: 'commercial',
        images: [{ url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200', publicId: 'sahara-1' }],
        coverImage: { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200' },
        date: new Date('2023-09-30'),
        client: 'Groupe Hôtelier Prestige',
        location: 'Ouarzazate, Maroc',
        area: '18,500 m²',
        status: 'completed',
        featured: true,
        tags: ['hôtel', 'luxe', 'traditionnel', 'contemporain'],
      },
    ];

    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log(`✅ ${sampleProjects.length} sample projects created`);

    console.log('\n🎉 Database seeded successfully!');
    console.log(`   Admin email: ${admin.email}`);
    console.log(`   Admin password: ${process.env.ADMIN_PASSWORD || 'Admin@2024!'}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();
