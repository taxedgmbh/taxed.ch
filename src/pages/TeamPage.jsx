import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const TeamPage = () => {
  const team = [
    {
      name: 'Emanuel Flury',
      role: 'Founder & Managing Director',
      description: 'Emanuel Flury is the Founder and Managing Director of Taxed GmbH. He is responsible for the overall management of the firm and advises clients in matters related to Swiss and international taxation, with a focus on expatriates. With a background in economics and finance, he ensures the firm\'s services are compliant, client-oriented, and up to date.',
      email: 'me@eflury.com',
      image: 'Professional headshot of Emanuel Flury, a man in business attire'
    },
    {
      name: 'Patricia Marie Fangon',
      role: 'Tax Consultant & Customer Service Specialist',
      description: 'Patricia Marie Fangon supports clients at Taxed GmbH in both tax matters and customer service. She helps manage client communication, documentation, and the preparation of tax-related information. Patricia is currently building her expertise in Swiss taxation, especially in the context of international clients.',
      email: 'patriciafangon@taxed.ch',
      image: 'Professional headshot of Patricia Marie Fangon, a woman with a friendly smile'
    },
    {
      name: 'Angela Samson',
      role: 'Tax Consultant & Research Specialist',
      description: 'Angela Samson is part of the Taxed GmbH team with a focus on tax research and support. She contributes to ensuring that the firm’s services are based on up-to-date Swiss and international tax regulations. Angela assists in the preparation of cases and background analyses for client inquiries.',
      email: 'angelasamson@taxed.ch',
      image: 'Professional headshot of Angela Samson, a woman in a professional setting'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Team | Taxed GmbH - Expert Swiss Tax Consulting Team</title>
        <meta name="description" content="Meet the expert team at Taxed GmbH. Our dedicated professionals provide top-tier Swiss tax consulting services for expatriates." />
        <meta property="og:title" content="Our Team | Taxed GmbH - Expert Swiss Tax Consulting Team" />
        <meta property="og:description" content="Meet the expert team at Taxed GmbH. Our dedicated professionals provide top-tier Swiss tax consulting services for expatriates." />
      </Helmet>

      <section className="py-20 bg-light-gray-bg-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark-gray mb-6">
              Meet Our Expert Team
            </h1>
            <p className="text-xl text-dark-gray max-w-3xl mx-auto">
              Our experienced professionals are dedicated to providing you with 
              the best possible tax consulting services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex"
              >
                <Card className="h-full w-full flex flex-col card-hover border-steel-blue/20 shadow-lg bg-white">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-brand-red">
                      <img 
                        className="w-full h-full object-cover"
                        alt={member.image}
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                    <CardTitle className="text-xl text-dark-gray">{member.name}</CardTitle>
                    <CardDescription className="text-steel-blue font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-dark-gray/80 text-center text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto justify-center">
                     <a href={`mailto:${member.email}`} className="text-steel-blue hover:text-brand-red transition-colors flex items-center space-x-2 text-sm font-medium">
                        <Mail className="h-4 w-4" />
                        <span>{member.email}</span>
                      </a>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamPage;