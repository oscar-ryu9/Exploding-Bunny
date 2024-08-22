#version 330 core
// Input vertex data, different for all executions of this shader.
layout (triangles) in;
layout (points, max_vertices = 1) out;

in VS_OUT {
    vec2 UV;
} gs_in[];

out vec2 TexCoords; 

uniform float current_time;
uniform int boom;

vec3 GetNormal()
{
    vec3 a = vec3(gl_in[0].gl_Position) - vec3(gl_in[1].gl_Position);
    vec3 b = vec3(gl_in[2].gl_Position) - vec3(gl_in[1].gl_Position);
    return normalize(cross(a, b));
}

vec4 explode(vec4 position, vec3 normal, int boom)
{
    vec3 direction;
    float vb;
    float magnitude = 1.0;
    float speed = 1.5;
    float acceleration = 0.5;
    if (boom == 1){
        vb = (speed * current_time + 0.5 * acceleration * pow(current_time, 2));
        direction = normal * vb; 
    }
    else {
        direction = vec3(0.0, 0.0, 0.0);
    }
    return position + vec4(direction, 0.0);
}

void main() {    
    vec3 normal = GetNormal();

    for(int i=0; i<gl_in.length(); i++)
    {
        gl_Position = explode(gl_in[i].gl_Position, normal, boom);
        TexCoords = gs_in[i].UV;
        EmitVertex();
        EndPrimitive();
    }
}
