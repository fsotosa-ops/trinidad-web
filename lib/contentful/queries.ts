// lib/contentful/queries.ts
export const FULL_TEST_QUERY = `
  query {
    # Sección 3 - Solución con Referencias a Founders
    sectionSolutionCollection(limit: 1) {
      items {
        tituloH2Es
        foundersCollection(limit: 3) {
          items {
            ... on Founder {
              nombre
              titulocanonico
            }
          }
        }
      }
    }
    # Sección 4 - Proceso con Referencias a Sprints
    sectionProcessCollection(limit: 1) {
      items {
        tituloH2Es
        sprintsCollection(limit: 4) {
          items {
            ... on Sprint {
              numero
              nombreEs
              entregableEs
            }
          }
        }
      }
    }
    # Sección 6 - Precios con Referencias a Productos
    sectionPricingCollection(limit: 1) {
      items {
        tituloH2Es
        productosCollection(limit: 2) {
          items {
            ... on Product {
              nombreEs
              precio
            }
          }
        }
      }
    }
  }
`;