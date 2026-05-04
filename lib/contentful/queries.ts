export const HOMEPAGE_QUERY = /* GraphQL */ `
  query Homepage {
    sectionHeroCollection(limit: 1) {
      items {
        etiquetaSuperiorEs
        tituloRichEs {
        json
        }
        subtituloEs
        ctaPrincipalEs
        ctaUrlEs
        ctaSecundarioEs
        tarjetasLateralesCollection {
        items {
          categoria
          descripcion
          }
        }
      }
    }
    sectionProblemCollection(limit: 1) {
      items {
        tituloH2Es
        cuerpoEs {
          json
        }
      }
    }
    sectionTargetCollection(limit: 1) {
      items {
        tituloH2Es
        verticalesEs
        tituloEncajaEs    
        tituloNoEncajaEs
        encajaSiEs {
          json
        }
        noEncajaSiEs {
          json
        }
      }
    }
    sectionSolutionCollection(limit: 1) {
      items {
        tituloH2Es
        cuerpoEs {
          json
        }
        foundersCollection(limit: 3) {
          items {
            ... on Founder {
              nombre
              titulocanonico
              aristaEs
              descripcionEs
            }
          }
        }
      }
    }
    sectionProcessCollection(limit: 1) {
      items {
        tituloH2Es
        introEs
        cierreEs {
          json
        }
        sprintsCollection(limit: 6) {
          items {
            ... on Sprint {
              numero
              nombreEs
              objetivoEs
              entregableEs
              dias
            }
          }
        }
      }
    }
    sectionPricingCollection(limit: 1) {
      items {
        eyebrowPricingEs
        tituloH2Es
        ctaUrlEs
        precioRegularEs
        etiquetaOfertaEs
        ofertaIrresistibleEs {
          json
        }
        productosCollection(limit: 5) {
          items {
            ... on Product {
              nombreEs
              precio
              disclaimerEs
              descripcionEs
              hitosPagoEs
            }
          }
        }
      }
    }
    sectionClosingCollection(limit: 1) {
      items {
        tituloH2Es
        tituloRichEs {  
          json
        }
        ctaTextoEs
        ctaUrlEs
        cuerpoEs {
          json
        }
        metadatosEs      
        disclaimerPaisesEs
      }
    }
  }
`;

// Optional schema extensions — fetched separately so missing Contentful types
// (Pillar, frameworkImage field) don't break the homepage build before Felipe
// adds them in the CMS.
export const HOMEPAGE_EXTENSIONS_QUERY = /* GraphQL */ `
  query HomepageExtensions {
    sectionHeroCollection(limit: 1) {
      items {
        pillaresCollection(limit: 3) {
          items {
            ... on Pillar {
              etiquetaEs
              descripcionEs
              orden
            }
          }
        }
      }
    }
    sectionSolutionCollection(limit: 1) {
      items {
        frameworkImage {
          url
          width
          height
          title
          description
        }
      }
    }
  }
`;
