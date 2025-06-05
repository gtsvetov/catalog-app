export async function fetchMockProducts(): Promise<Product[]> {
  const response = await fetch("/src/graphql/mock.rest.json");
  if (!response.ok) throw new Error("Failed to load mock data");
  return await response.json();
}
