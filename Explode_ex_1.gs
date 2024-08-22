#version 330 core
// Input vertex data, different for all executions of this shader.
layout (triangles) in;
layout (triangle_strip, max_vertices = 3) out;


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

vec4 explode(vec4 P, vec3 normal, int boom)
{
    vec3 direction;
    float vb;
    float magnitude = 1.0;
    float len = sqrt(P.x*P.x + P.z*P.z);
    if (boom ==1){
        vb=0.9 + 1.0 * cos(current_time*2.0 + len);
        direction = normal * vb; 
    }
    else {
        direction = vec3(0.0,0.0,0.0);
    }
    return P + vec4(direction, 0.0);
}

void main() {    
    vec3 normal = GetNormal();

    gl_Position = explode(gl_in[0].gl_Position, normal,boom);
    TexCoords = gs_in[0].UV;
    EmitVertex();
    gl_Position = explode(gl_in[1].gl_Position, normal,boom);
    TexCoords = gs_in[1].UV;
    EmitVertex();
    gl_Position = explode(gl_in[2].gl_Position, normal,boom);
    TexCoords = gs_in[2].UV;
    EmitVertex();
    EndPrimitive();
}